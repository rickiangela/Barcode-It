CREATE DATABASE barcode_it_db;

USE barcode_it_db;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)

  CREATE TABLE `Barcodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barcode_num` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `photo_url` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `barcodes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `BarcodeId` int(11) DEFAULT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BarcodeId` (`BarcodeId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`BarcodeId`) REFERENCES `Barcodes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `items_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
