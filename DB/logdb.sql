-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dailylogdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dailylogdb` ;

-- -----------------------------------------------------
-- Schema dailylogdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dailylogdb` DEFAULT CHARACTER SET utf8 ;
USE `dailylogdb` ;

-- -----------------------------------------------------
-- Table `day`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `day` ;

CREATE TABLE IF NOT EXISTS `day` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` TEXT NULL,
  `title` VARCHAR(100) NOT NULL,
  `create_date` DATETIME NULL,
  `last_update` DATETIME NULL,
  `rating` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS log@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'log'@'localhost' IDENTIFIED BY 'log';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'log'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `day`
-- -----------------------------------------------------
START TRANSACTION;
USE `dailylogdb`;
INSERT INTO `day` (`id`, `comment`, `title`, `create_date`, `last_update`, `rating`) VALUES (1, 'Today was a good day', 'Good Day', '2018-12-12', '2018-12-12', 5);

COMMIT;

