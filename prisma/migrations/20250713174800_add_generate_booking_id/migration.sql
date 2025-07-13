-- migration.sql
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS CHAR(6) AS $$
DECLARE
chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
BEGIN
FOR i IN 1..6 LOOP
    result := result || substr(chars, (floor(random() * length(chars)) + 1)::int, 1);
END LOOP;
RETURN result;
END;
$$ LANGUAGE plpgsql;

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "id" SET DEFAULT generate_booking_id();
