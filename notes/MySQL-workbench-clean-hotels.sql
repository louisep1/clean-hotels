--  SELECT order_id, oi.product_id, name, quantity, oi.unit_price
--  FROM order_items oi
--  JOIN products p
--  ON oi.product_id = p.product_id;

-- SELECT *
-- FROM rooms
-- JOIN availability
-- ON rooms.id = availability.room_id;

-- SELECT 
--   r.id,
--   room_number,
--   location,
--   type,
--   rate,
--   date,
--   a.available
-- FROM rooms r
-- JOIN availability a
-- ON r.id = a.room_id
-- WHERE (date = '2022-09-01' OR date = '2022-09-02') AND location = 'tokyo';

-- SELECT *
-- FROM rooms r
-- JOIN availability a
-- ON r.id = a.room_id
-- WHERE (date = '2022-09-01' OR date = '2022-09-02') AND location = 'tokyo';

-- THIS: 
-- SELECT 
--   r.id,
--   room_number,
--   location,
--   type,
--   rate,
--   date,
--   a.available
-- FROM availability a
-- JOIN rooms r
-- ON a.room_id = r.id
-- WHERE 
--   location = 'tokyo' AND a.available = 1
--   AND
--   (date = '2022-09-01' OR date = '2022-09-02');


SELECT
  r.id,
  room_number,
  location,
  type,
  rate,
  date,
  a.available,
  a.id AS room_date_id
FROM availability a
JOIN rooms r
ON a.room_id = r.id
WHERE 
  location = 'tokyo' AND a.available = 1
  AND
--   (date = '2022-11-29' AND date = '2022-11-30' AND date = '2022-12-01' AND date = '2022-12-02' AND date = '2022-12-03' AND date = '2022-12-04' AND date = '2022-12-05');
--   (date = '2022-10-30' AND date = '2022-10-31' AND date = '2022-11-01' AND date = '2022-11-02' AND date = '2022-11-03' AND date = '2022-11-04' AND date = '2022-11-05');
-- (date = '2022-10-30' OR date = '2022-10-31' OR date = '2022-11-01' OR date = '2022-11-02' OR date = '2022-11-03' OR date = '2022-11-04' OR date = '2022-11-05');

--   date >= '2022-10-30' AND date <= '2022-11-05';
--   date >= '2022-11-29' AND date <= '2022-12-05';

--   date >= '2022-10-30' AND date < '2022-11-06';
  date >= '2022-09-08' AND date < '2022-09-09';