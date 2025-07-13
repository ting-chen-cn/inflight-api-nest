CREATE FUNCTION generate_booking_id()
    RETURNS CHAR(6) AS $$
DECLARE
chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INT := 0;
BEGIN
FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars)) + 1, 1);
END LOOP;
RETURN result;
END;
$$ LANGUAGE plpgsql;
