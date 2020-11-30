-- commands to reset database if necessary
DROP DATABASE IF EXISTS soundcloud;
CREATE DATABASE soundcloud;
-- USE soundcloud;

-- CREATE DATABASE IF NOT EXISTS soundcloud;

USE soundcloud;

-- DEFINE SCHEMA

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  time_stamp INT NOT NULL
);

-- LOAD CSV DATA FROM FILE

LOAD DATA LOCAL INFILE './seed/data.csv'
INTO TABLE comments
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(user_id, song_id, content, time_stamp);

-- INSERT INTO comments (user_id, song_id, content, time_stamp)
-- VALUES(665510, 3802565, "Consequat qui officia nulla minim.", 159);

-- COPY products(product_id, style_id, size, quantity)
-- FROM 'ABSOLUTE PATH TO YOUR .csv FILE'
-- DELIMITER ','
-- CSV HEADER;
-- And the execution of the sql script is:
-- psql -U USERNAME -d DATABASE_NAME -a -f ./seeder/postgres_seeder/seed.sql

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- CREATE TABLE discounts (
--     id INT NOT NULL AUTO_INCREMENT,
--     title VARCHAR(255) NOT NULL,
--     expired_date DATE NOT NULL,
--     amount DECIMAL(10 , 2 ) NULL,
--     PRIMARY KEY (id)
-- );

-- LOAD DATA LOCAL INFILE './seed/data.csv'
-- INTO TABLE comments
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (user_id, song_id, content, time_stamp);
