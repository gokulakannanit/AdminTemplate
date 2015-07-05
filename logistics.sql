-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2015 at 02:09 PM
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
-- Table structure for table `manufacturer`
--

CREATE TABLE IF NOT EXISTS `manufacturer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturerName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`id`, `manufacturerName`) VALUES
(4, 'Tata Motors'),
(5, 'BMW');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `phone`, `address`, `email`, `pan`) VALUES
(5, 'Gokul', '1236547891', 'chennai', 'gokulakannanit@gmail.com', 'AMSDF1234D');

-- --------------------------------------------------------

--
-- Table structure for table `spare`
--

CREATE TABLE IF NOT EXISTS `spare` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `spare` varchar(255) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `tax` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `warrenty` varchar(255) NOT NULL,
  `workorderId` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `spare`
--

INSERT INTO `spare` (`id`, `spare`, `rate`, `quantity`, `tax`, `discount`, `warrenty`, `workorderId`) VALUES
(27, 'Bolt', '25', '1', '', '', '05/06/2016', 1),
(30, 'Screw', '10', '2', '', '', '2015-07-04T18:30:00.000Z', 12);

-- --------------------------------------------------------

--
-- Table structure for table `truck_model`
--

CREATE TABLE IF NOT EXISTS `truck_model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `truckModel` varchar(255) NOT NULL,
  `tonnage` varchar(255) NOT NULL,
  `tankCapacity` varchar(255) NOT NULL,
  `tyreSize` varchar(255) NOT NULL,
  `engineCapacity` varchar(255) NOT NULL,
  `manufacturerId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `truck_model`
--

INSERT INTO `truck_model` (`id`, `truckModel`, `tonnage`, `tankCapacity`, `tyreSize`, `engineCapacity`, `manufacturerId`) VALUES
(1, 'Tata Ace', '1500', '20', '', '', 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `vehiclefc`
--

INSERT INTO `vehiclefc` (`id`, `date`, `rto`, `fcNo`, `amount`, `renewalDate`, `vehicleId`, `paymentMode`) VALUES
(1, '2015-06-14T13:03:43.823Z', 'fdsfdsf', '12121', '2341', '', 2, 'Cash'),
(2, '2015-06-11T18:30:00.000Z', 'abc', '2222', '1234', '2015-06-12T18:30:00.000Z', 0, 'Cash');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `vehicleinsurance`
--

INSERT INTO `vehicleinsurance` (`id`, `purchaseDate`, `paymentMode`, `companyName`, `policyNo`, `amount`, `coverageLimit`, `vehicleId`) VALUES
(5, '2015-07-01T17:52:09.858Z', 'Cash', 'Bajaj Alianz', '7489561278', '1458998', '', 6);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `vehiclelist`
--

INSERT INTO `vehiclelist` (`id`, `vehicleNo`, `date`, `amtPurchased`, `modelYear`, `make`, `ownershipType`, `chasisNo`, `engineNo`, `ownership`, `owner`, `odometer`, `fuelType`, `type`) VALUES
(2, 'TN 22 AF 1234', '2015-06-09T15:37:02.949Z', '500000', '2009', 'Tata', 'own', '12121212', '121212', '', 'RAJ', '121212', 'Diesel', 'LCV'),
(4, 'TN 22 AF 1234', '2015-06-12T15:37:02.949Z', '500000', '2009', 'Tata', 'own', '7567876', '76876876', '', 'RAJ', '65756756', 'TATA', 'TATA'),
(5, 'TN 99k 8546', '2015-06-29T17:47:20.350Z', '', '', 'Tata', 'own', '', '', '', 'ASED', '', 'Diesel', 'LCV');

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
(1, 'Surya', 'Battery', 'perumal', '1234567890', 'df', ''),
(2, 'Venkateshwara', 'Raj', 'venky', '1234567890', 'velachery', '');

-- --------------------------------------------------------

--
-- Table structure for table `workorder`
--

CREATE TABLE IF NOT EXISTS `workorder` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `vehicleId` int(255) NOT NULL,
  `billNumber` varchar(255) NOT NULL,
  `billDate` varchar(255) NOT NULL,
  `workorderType` varchar(255) NOT NULL,
  `labour` varchar(255) NOT NULL,
  `paymentMode` varchar(255) NOT NULL,
  `dealerId` int(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `workorder`
--

INSERT INTO `workorder` (`id`, `vehicleId`, `billNumber`, `billDate`, `workorderType`, `labour`, `paymentMode`, `dealerId`, `comment`) VALUES
(1, 2, 'B1001', '05/05/2015', 'S', '0', 'Cash', 1, ''),
(2, 2, 'B1002', '06/07/2015', 'L', '750', 'Cash', 2, ''),
(12, 5, 'B1010', '2015-07-04T18:30:00.000Z', 'S', '', 'Cash', 1, '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
