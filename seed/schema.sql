/*  Execute this file from the command line in seed folder by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Drop / create database
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `soundcloud` ;

CREATE DATABASE IF NOT EXISTS `soundcloud` DEFAULT CHARACTER SET utf8 ;

USE `soundcloud` ;

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
-- Table `content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `content` ;

CREATE TABLE IF NOT EXISTS `content` (
  `content_id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NULL,
  PRIMARY KEY (`content_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `songs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `songs` ;

CREATE TABLE IF NOT EXISTS `songs` (
  `song_id` INT NOT NULL AUTO_INCREMENT,
  `system_number` INT NULL,
  PRIMARY KEY (`song_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `system_number` INT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;