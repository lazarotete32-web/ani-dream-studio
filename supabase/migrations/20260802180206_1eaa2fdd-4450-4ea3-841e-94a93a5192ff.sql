CREATE TABLE public.user_credits (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits integer NOT NULL DEFAULT 5,
  last_reset date NOT NULL DEFAULT current_date,
  is_pro boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.user_credits TO authenticated;
GRANT ALL ON public.user_credits TO service_role;

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credits"
ON public.user_credits FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.claim_daily_credits()
RETURNS public.user_credits
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  row public.user_credits;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.user_credits (user_id) VALUES (uid)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.user_credits
  SET credits = 5, last_reset = current_date, updated_at = now()
  WHERE user_id = uid AND last_reset < current_date;

  SELECT * INTO row FROM public.user_credits WHERE user_id = uid;
  RETURN row;
END;
$$;

CREATE OR REPLACE FUNCTION public.spend_credit()
RETURNS public.user_credits
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  row public.user_credits;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  PERFORM public.claim_daily_credits();

  SELECT * INTO row FROM public.user_credits WHERE user_id = uid;

  IF NOT row.is_pro AND row.credits <= 0 THEN
    RAISE EXCEPTION 'No credits left today';
  END IF;

  IF NOT row.is_pro THEN
    UPDATE public.user_credits
    SET credits = credits - 1, updated_at = now()
    WHERE user_id = uid
    RETURNING * INTO row;
  END IF;

  RETURN row;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_daily_credits() FROM public;
REVOKE ALL ON FUNCTION public.spend_credit() FROM public;
GRANT EXECUTE ON FUNCTION public.claim_daily_credits() TO authenticated;
GRANT EXECUTE ON FUNCTION public.spend_credit() TO authenticated;