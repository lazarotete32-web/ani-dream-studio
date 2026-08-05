CREATE OR REPLACE FUNCTION public.refund_credit()
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

  UPDATE public.user_credits
  SET credits = LEAST(5, credits + 1), updated_at = now()
  WHERE user_id = uid AND NOT is_pro
  RETURNING * INTO row;

  IF row IS NULL THEN
    SELECT * INTO row FROM public.user_credits WHERE user_id = uid;
  END IF;

  RETURN row;
END;
$$;

REVOKE ALL ON FUNCTION public.refund_credit() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.refund_credit() FROM anon;
GRANT EXECUTE ON FUNCTION public.refund_credit() TO authenticated;
GRANT EXECUTE ON FUNCTION public.refund_credit() TO service_role;