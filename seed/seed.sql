-- commands to reset database if necessary
-- DROP DATABASE IF EXISTS soundcloud;
-- CREATE DATABASE soundcloud;
-- USE soundcloud;

CREATE DATABASE IF NOT EXISTS soundcloud;

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


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/