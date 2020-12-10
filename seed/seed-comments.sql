/*  Execute this file from the command line in seed folder by typing:
 *    mysql -u root < seed-comments.sql
 *  to create the database and the tables.*/

-- schema created from MySQL Workbench

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `soundcloud-test` ;

-- -----------------------------------------------------
-- Table `comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comments` ;

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `song_id` INT(11) NOT NULL,
  `content_id` INT NOT NULL,
  `time_stamp` INT(11) NOT NULL,
  PRIMARY KEY (`comment_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- LOAD CSV DATA FROM FILES
-- -----------------------------------------------------

LOAD DATA LOCAL INFILE './data/comments.csv'
INTO TABLE `comments`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(user_id, song_id, content_id, time_stamp);


-- -----------------------------------------------------
-- CREATE INDEXES AND FOREIGN KEYS
-- -----------------------------------------------------

-- ALTER TABLE comments
--     ADD CONSTRAINT song_id
--       FOREIGN KEY (song_id)
--       REFERENCES songs (song_id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE;

ALTER TABLE comments
    ADD CONSTRAINT idx_user_id
      FOREIGN KEY idx_user_id (user_id)
      REFERENCES users (user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;

-- CREATE INDEX `idx_user_id` ON `soundcloud`.`comments` (`user_id` ASC);

-- CREATE INDEX `idx_song_id` ON `soundcloud`.`comments` (`song_id` ASC);

-- CREATE INDEX `idx_content_id` ON `soundcloud`.`comments` (`content_id` ASC);

-- CREATE INDEX `idx_time_stamp` ON `soundcloud`.`comments` (`time_stamp` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;






-- Old Create Table with foreign keys:

-- CREATE TABLE IF NOT EXISTS `soundcloud`.`comments` (
--   `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
--   `user_id` INT(11) NOT NULL,
--   `song_id` INT(11) NOT NULL,
--   `content_id` INT NOT NULL,
--   `time_stamp` INT(11) NOT NULL,
--   PRIMARY KEY (`comment_id`),
--   CONSTRAINT `song_id`
--     FOREIGN KEY (`song_id`)
--     REFERENCES `soundcloud`.`songs` (`song_id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
--   CONSTRAINT `user_id`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `soundcloud`.`users` (`user_id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
--   CONSTRAINT `content_id`
--     FOREIGN KEY (`content_id`)
--     REFERENCES `soundcloud`.`content` (`content_id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE)
-- ENGINE = InnoDB;

-- CREATE INDEX `idx_user_id` ON `soundcloud`.`comments` (`user_id` ASC);

-- CREATE INDEX `idx_song_id` ON `soundcloud`.`comments` (`song_id` ASC);

-- CREATE INDEX `idx_content_id` ON `soundcloud`.`comments` (`content_id` ASC);

-- CREATE INDEX `idx_time_stamp` ON `soundcloud`.`comments` (`time_stamp` ASC);


