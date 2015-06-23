-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2015 at 07:12 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `logistics`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientlist`
--

CREATE TABLE IF NOT EXISTS `clientlist` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `clientlist`
--

INSERT INTO `clientlist` (`id`, `companyName`, `address`, `contactPerson`, `phone`, `email`) VALUES
(1, 'abc ', 'perungudi', 'xyz', '123456789', 'hjj@fvhg.com');

-- --------------------------------------------------------

--
-- Table structure for table `companylist`
--

CREATE TABLE IF NOT EXISTS `companylist` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `tan` varchar(255) NOT NULL,
  `serviceTax` varchar(255) NOT NULL,
  `ssi` varchar(255) NOT NULL,
  `pan` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `typeOfCompany` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `companylist`
--

INSERT INTO `companylist` (`id`, `companyName`, `tan`, `serviceTax`, `ssi`, `pan`, `address`, `owner`, `typeOfCompany`, `email`, `phone`) VALUES
(15, 'vcbvc', '', '', '', '', 'bvcbvcvc', '2,5', 'P', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE IF NOT EXISTS `owners` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pan` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `phone`, `address`, `email`, `pan`) VALUES
(5, 'gokul', '1236547891', 'chennai', 'gokulakannanit@gmail.com', 'AMSDF1234D'),
(6, 'RAJ', '', '13 Chettinadu Gree villa', 'raj@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `vehiclebattery`
--

CREATE TABLE IF NOT EXISTS `vehiclebattery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paymentMode` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `batteryNo` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `dealer` varchar(255) NOT NULL,
  `warrentyDate` varchar(255) NOT NULL,
  `receiptNo` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `vehicleId` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicleId` (`vehicleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `vehiclebattery`
--

INSERT INTO `vehiclebattery` (`id`, `paymentMode`, `make`, `batteryNo`, `date`, `dealer`, `warrentyDate`, `receiptNo`, `price`, `vehicleId`) VALUES
(1, 'Cash', 'MRF', '45', '2015-06-14T03:51:06.969Z', 'dealer1', '', '3', '343', 2),
(2, 'Cash', 'make1', '5464', '2015-06-14T04:31:26.287Z', 'dealer1', '', '12555', '5000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicleemission`
--

CREATE TABLE IF NOT EXISTS `vehicleemission` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) NOT NULL,
  `rto` varchar(255) NOT NULL,
  `emissionNo` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `renewalDate` varchar(255) NOT NULL,
  `paymentMode` varchar(255) NOT NULL,
  `vehicleId` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicleId` (`vehicleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `vehicleemission`
--

INSERT INTO `vehicleemission` (`id`, `date`, `rto`, `emissionNo`, `amount`, `renewalDate`, `paymentMode`, `vehicleId`) VALUES
(1, '2015-06-14T14:46:43.044Z', 'north chennai', '5000', '1250', '', 'Cash', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vehiclefc`
--

CREATE TABLE IF NOT EXISTS `vehiclefc` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) NOT NULL,
  `rto` varchar(255) NOT NULL,
  `fcNo` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `renewalDate` varchar(255) NOT NULL,
  `vehicleId` int(255) NOT NULL,
  `paymentMode` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicleId` (`vehicleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `vehiclefc`
--

INSERT INTO `vehiclefc` (`id`, `date`, `rto`, `fcNo`, `amount`, `renewalDate`, `vehicleId`, `paymentMode`) VALUES
(1, '2015-06-14T13:03:43.823Z', 'fdsfdsf', '12121', '2341', '', 2, 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `vehicleinsurance`
--

CREATE TABLE IF NOT EXISTS `vehicleinsurance` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `purchaseDate` varchar(255) NOT NULL,
  `paymentMode` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `policyNo` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `coverageLimit` varchar(255) NOT NULL,
  `vehicleId` int(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `vehicleinsurance`
--

INSERT INTO `vehicleinsurance` (`id`, `purchaseDate`, `paymentMode`, `companyName`, `policyNo`, `amount`, `coverageLimit`, `vehicleId`) VALUES
(1, '', '', '', '', '', '', 0),
(4, '2015-06-13T12:32:02.604Z', 'Cash', 'LIC', '124634', '12000', '250000', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vehiclelist`
--

CREATE TABLE IF NOT EXISTS `vehiclelist` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `vehicleNo` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `amtPurchased` varchar(255) NOT NULL,
  `modelYear` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `ownershipType` varchar(255) NOT NULL,
  `chasisNo` varchar(255) NOT NULL,
  `engineNo` varchar(255) NOT NULL,
  `ownership` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `odometer` varchar(255) NOT NULL,
  `fuelType` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `vehiclelist`
--

INSERT INTO `vehiclelist` (`id`, `vehicleNo`, `date`, `amtPurchased`, `modelYear`, `make`, `ownershipType`, `chasisNo`, `engineNo`, `ownership`, `owner`, `odometer`, `fuelType`, `type`) VALUES
(2, 'TN 22 AF 1234', '2015-06-12T15:37:02.949Z', '500000', '2009', 'Tata', 'own', '12121212', '121212', '', 'RAJ', '121212', 'Diesel', 'LCV'),
(4, 'TN 22 AF 1234', '2015-06-12T15:37:02.949Z', '500000', '2009', 'Tata', 'own', '7567876', '76876876', '', 'RAJ', '65756756', 'TATA', 'TATA');

-- --------------------------------------------------------

--
-- Table structure for table `vehicletyre`
--

CREATE TABLE IF NOT EXISTS `vehicletyre` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `tyreNo` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `dealer` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `warrentyDate` varchar(255) NOT NULL,
  `receiptNo` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `vehicleId` int(255) NOT NULL,
  `paymentMode` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicleId` (`vehicleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `vehicletyre`
--

INSERT INTO `vehicletyre` (`id`, `tyreNo`, `make`, `position`, `dealer`, `date`, `warrentyDate`, `receiptNo`, `price`, `vehicleId`, `paymentMode`) VALUES
(3, '1524', 'MRF', 'FL', 'dealer1', '2015-06-13T15:38:53.938Z', '', '12', '102', 2, 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE IF NOT EXISTS `vendor` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `typeOfGoods` varchar(255) NOT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `companyName`, `typeOfGoods`, `contactPerson`, `phone`, `address`, `email`) VALUES
(1, 'surya', 'Battery', 'perumal', '1234567890', 'df', ''),
(2, 'venkateshwara', 'Raj', 'venky', '1234567890', 'velachery', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
