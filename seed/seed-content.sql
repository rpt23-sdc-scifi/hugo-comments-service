/*  Execute this file from the command line in seed folder by typing:
 *    mysql -u root < seed-content.sql
 *  to create the database and the tables.*/

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
-- DROP SCHEMA IF EXISTS `soundcloud` ;

-- -----------------------------------------------------
-- Schema soundcloud
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `soundcloud` DEFAULT CHARACTER SET utf8 ;
USE `soundcloud` ;


-- -----------------------------------------------------
-- Table `soundcloud`.`content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soundcloud`.`content` ;

CREATE TABLE IF NOT EXISTS `soundcloud`.`content` (
  `content_id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NULL,
  PRIMARY KEY (`content_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- LOAD CSV DATA FROM FILES
-- -----------------------------------------------------

LOAD DATA LOCAL INFILE './data/content.csv'
INTO TABLE `soundcloud`.`content`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(text);

-- -----------------------------------------------------
-- ADD INDEXES
-- -----------------------------------------------------

-- CREATE INDEX `idx_text` ON `soundcloud`.`content` (`text` ASC);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
