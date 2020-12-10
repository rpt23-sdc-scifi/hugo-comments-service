/*  Execute this file from the command line in seed folder by typing:
 *    mysql -u root < load-data.sql
 *  to load CSV data into (existing) tables.*/

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `soundcloud` ;

-- -----------------------------------------------------
-- COMMENTS TABLE
-- -----------------------------------------------------

\! echo "Loading CSV data into Comments table..."

LOAD DATA LOCAL INFILE './data/comments.csv'
INTO TABLE `comments`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(user_id, song_id, content_id, time_stamp);

-- -----------------------------------------------------
-- CONTENT TABLE
-- -----------------------------------------------------

\! echo "Loading CSV data into Content table..."

LOAD DATA LOCAL INFILE './data/content.csv'
INTO TABLE `content`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(text);

-- -----------------------------------------------------
-- SONGS TABLE
-- -----------------------------------------------------

\! echo "Loading CSV data into Songs table..."

LOAD DATA LOCAL INFILE './data/songs.csv'
INTO TABLE `songs`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(system_number);

-- -----------------------------------------------------
-- USERS TABLE
-- -----------------------------------------------------

\! echo "Loading CSV data into Users table..."

LOAD DATA LOCAL INFILE './data/users.csv'
INTO TABLE `users`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(system_number);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;