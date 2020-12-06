-- schema created from MySQL Workbench

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema test_db_comments
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema soundcloud
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `soundcloud` ;

-- -----------------------------------------------------
-- Schema soundcloud
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `soundcloud` DEFAULT CHARACTER SET utf8 ;
USE `soundcloud` ;

-- -----------------------------------------------------
-- Table `soundcloud`.`songs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soundcloud`.`songs` ;

CREATE TABLE IF NOT EXISTS `soundcloud`.`songs` (
  `song_id` INT NOT NULL AUTO_INCREMENT,
  `system_number` INT NULL,
  PRIMARY KEY (`song_id`))
ENGINE = InnoDB;

CREATE INDEX `idx_system_number` ON `soundcloud`.`songs` (`system_number` ASC);


-- -----------------------------------------------------
-- Table `soundcloud`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soundcloud`.`users` ;

CREATE TABLE IF NOT EXISTS `soundcloud`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `system_number` INT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE INDEX `idx_system_number` ON `soundcloud`.`users` (`system_number` ASC);


-- -----------------------------------------------------
-- Table `soundcloud`.`content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soundcloud`.`content` ;

CREATE TABLE IF NOT EXISTS `soundcloud`.`content` (
  `content_id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NULL,
  PRIMARY KEY (`content_id`))
ENGINE = InnoDB;

CREATE INDEX `idx_text` ON `soundcloud`.`content` (`text` ASC);


-- -----------------------------------------------------
-- Table `soundcloud`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soundcloud`.`comments` ;

CREATE TABLE IF NOT EXISTS `soundcloud`.`comments` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `song_id` INT(11) NOT NULL,
  `content_id` INT NOT NULL,
  `time_stamp` INT(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  CONSTRAINT `song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `soundcloud`.`songs` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `soundcloud`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `content_id`
    FOREIGN KEY (`content_id`)
    REFERENCES `soundcloud`.`content` (`content_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10259775
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `idx_user_id` ON `soundcloud`.`comments` (`user_id` ASC);

CREATE INDEX `idx_song_id` ON `soundcloud`.`comments` (`song_id` ASC);

CREATE INDEX `idx_content_id` ON `soundcloud`.`comments` (`content_id` ASC);

CREATE INDEX `idx_time_stamp` ON `soundcloud`.`comments` (`time_stamp` ASC);

-- -----------------------------------------------------
-- LOAD CSV DATA FROM FILES
-- -----------------------------------------------------

LOAD DATA LOCAL INFILE './seed/data/comments.csv'
INTO TABLE `soundcloud`.`comments`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './seed/data/users.csv'
INTO TABLE `soundcloud`.`users`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './seed/data/songs.csv'
INTO TABLE `soundcloud`.`songs`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './seed/data/content.csv'
INTO TABLE `soundcloud`.`content`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


/*  Execute this file from the command line by typing:
 *    mysql -u root < seed/seed-mysql.sql
 *  to create the database and the tables.*/