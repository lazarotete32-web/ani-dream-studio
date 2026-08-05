DROP FUNCTION IF EXISTS public.refund_credit();

CREATE OR REPLACE FUNCTION public.reserve_credit_for_user(_user_id uuid)
RETURNS public.user_credits
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  row public.user_credits;
BEGIN
  INSERT INTO public.user_credits (user_id) VALUES (_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.user_credits
  SET credits = 5, last_reset = current_date, updated_at = now()
  WHERE user_id = _user_id AND last_reset < current_date;

  SELECT * INTO row FROM public.user_credits WHERE user_id = _user_id FOR UPDATE;

  IF row IS NULL THEN
    RAISE EXCEPTION 'Credit account not found';
  END IF;

  IF NOT row.is_pro AND row.credits <= 0 THEN
    RAISE EXCEPTION 'No credits left today';
  END IF;

  IF NOT row.is_pro THEN
    UPDATE public.user_credits
    SET credits = credits - 1, updated_at = now()
    WHERE user_id = _user_id
    RETURNING * INTO row;
  END IF;

  RETURN row;
END;
$$;

CREATE OR REPLACE FUNCTION public.refund_credit_for_user(_user_id uuid)
RETURNS public.user_credits
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  row public.user_credits;
BEGIN
  UPDATE public.user_credits
  SET credits = LEAST(5, credits + 1), updated_at = now()
  WHERE user_id = _user_id AND NOT is_pro
  RETURNING * INTO row;

  IF row IS NULL THEN
    SELECT * INTO row FROM public.user_credits WHERE user_id = _user_id;
  END IF;

  RETURN row;
END;
$$;

REVOKE ALL ON FUNCTION public.reserve_credit_for_user(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.refund_credit_for_user(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_credit_for_user(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.refund_credit_for_user(uuid) TO service_role;