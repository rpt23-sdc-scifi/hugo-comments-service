/*  Execute this file from the command line in seed folder by typing:
 *    mysql -u root < indexes.sql
 *  to create the table indexes.*/

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `soundcloud` ;

-- -----------------------------------------------------
-- CREATE INDEXES ON COMMENTS TABLE
-- -----------------------------------------------------

\! echo "Creating idx_user_id on Comments table..."

CREATE INDEX `idx_user_id` ON `comments` (`user_id`);

\! echo "Creating idx_song_id on Comments table..."

CREATE INDEX `idx_song_id` ON `comments` (`song_id`);

\! echo "Creating idx_content_id on Comments table..."

CREATE INDEX `idx_content_id` ON `comments` (`content_id`);

\! echo "Creating idx_time_stamp on Comments table..."

CREATE INDEX `idx_time_stamp` ON `comments` (`time_stamp`);

-- -----------------------------------------------------
-- CREATE INDEXES ON OTHER TABLES
-- -----------------------------------------------------

\! echo "Creating idx_text on Content table..."

CREATE INDEX `idx_text` ON `content` (`text`);

\! echo "Creating idx_system_number on Songs table..."

CREATE INDEX `idx_system_number` ON `songs` (`system_number`);

\! echo "Creating idx_system_number on Users table..."

CREATE INDEX `idx_system_number` ON `users` (`system_number`);

-- -----------------------------------------------------
-- CREATE FOREIGN KEYS ON COMMENTS TABLE
-- -----------------------------------------------------

\! echo "Adding foreign key on Comments table user_id column..."

ALTER TABLE `comments`
  ADD CONSTRAINT `idx_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

\! echo "Adding foreign key on Comments table song_id column..."

ALTER TABLE `comments`
  ADD CONSTRAINT `idx_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `songs` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

\! echo "Adding foreign key on Comments table content_id column..."

ALTER TABLE `comments`
  ADD CONSTRAINT `idx_content_id`
    FOREIGN KEY (`content_id`)
    REFERENCES `content` (`content_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;








-- Old Create Comments Table with foreign keys:

-- CREATE TABLE IF NOT EXISTS `comments` (
--   `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
--   `user_id` INT(11) NOT NULL,
--   `song_id` INT(11) NOT NULL,
--   `content_id` INT NOT NULL,
--   `time_stamp` INT(11) NOT NULL,
--   PRIMARY KEY (`comment_id`),
--   CONSTRAINT `song_id`
--     FOREIGN KEY (`song_id`)
--     REFERENCES `songs` (`song_id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
--   CONSTRAINT `user_id`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `users` (`user_id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
--   CONSTRAINT `content_id`
--     FOREIGN KEY (`content_id`)
--     REFERENCES `content` (`content_id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE)
-- ENGINE = InnoDB;


