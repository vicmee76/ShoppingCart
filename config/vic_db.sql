-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: vic_db
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `CartId` int NOT NULL AUTO_INCREMENT,
  `ProductId` int NOT NULL,
  `UserId` int NOT NULL,
  `Qty` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CartId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (6,1,11,1,'2021-12-28 09:43:28'),(7,3,11,1,'2021-12-28 09:43:53'),(8,4,11,1,'2021-12-28 09:43:57'),(9,5,11,4,'2021-12-28 09:44:02');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CategoryId` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(45) NOT NULL,
  `CategoryDescription` mediumtext,
  `CategoryImage` varchar(500) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'CLOTHING','They want to be able to see exactly what your product looks like, what it’s made of, the dimensions, what others think of it, and ultimately whether it meets their needs. Your product may be superior to a competitor’s, but if your product detail pages aren’t, they’ll buy from a competitor with a superior page. The data backs this up. 87% of consumers say that the content on product pages plays a significant role in whether they purchase. 98% of consumers have opted not to purchase a product because the product page was either insufficient or incorrect. Yet despite its importance, many ecommerce companies have significantly underperforming product pages. Baymard researchers reviewed pages on 60 of the top grossing ecommerce companies in the United States and Europe and graded them for usability according to 95 different benchmarks. Only 18% of the companies had product detail pages that were deemed “good” or “acceptable”. The lack of quality product pages across the board offers you a unique opportunity. If you can craft product detail pages that are superior to your competitors, you can increase your conversion rates and grow your market share.','https://1.bp.blogspot.com/-Q45319SNgB8/YSo43rh_adI/AAAAAAAAWJ4/YP-0r8bhIG0Gmmw5KfpKmoJL6PagyPqyQCLcBGAsYHQ/s0/cute-dp-images-cute-profile-pictures%2B%25281%2529.jpg','2021-12-22 22:34:36'),(4,'FOOD','They want to be able to see exactly what your product looks like, what it’s made of, the dimensions, what others think of it, and ultimately whether it meets their needs. Your product may be superior to a competitor’s, but if your product detail pages aren’t, they’ll buy from a competitor with a superior page. The data backs this up. 87% of consumers say that the content on product pages plays a significant role in whether they purchase. 98% of consumers have opted not to purchase a product because the product page was either insufficient or incorrect.','https://1.bp.blogspot.com/-Q45319SNgB8/YSo43rh_adI/AAAAAAAAWJ4/YP-0r8bhIG0Gmmw5KfpKmoJL6PagyPqyQCLcBGAsYHQ/s0/cute-dp-images-cute-profile-pictures%2B%25281%2529.jpg','2021-12-22 22:34:55'),(5,'MUSIC','They want to be able to see exactly what your product looks like.','https://1.bp.blogspot.com/-Q45319SNgB8/YSo43rh_adI/AAAAAAAAWJ4/YP-0r8bhIG0Gmmw5KfpKmoJL6PagyPqyQCLcBGAsYHQ/s0/cute-dp-images-cute-profile-pictures%2B%25281%2529.jpg','2021-12-22 22:35:16');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ProductId` int NOT NULL AUTO_INCREMENT,
  `CategoryId` int DEFAULT NULL,
  `ProductName` varchar(100) NOT NULL,
  `ProductDescription` mediumtext,
  `Sku` varchar(15) NOT NULL,
  `SellingPrice` decimal(10,2) NOT NULL,
  `Discount` int DEFAULT NULL,
  `StockLevel` int NOT NULL,
  `Colors` varchar(100) DEFAULT NULL,
  `PaymentType` varchar(100) DEFAULT NULL,
  `ProductImages` longtext NOT NULL,
  `ExpiredAt` datetime NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ShippingPercentage` int DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,4,'Rice Bag','50kg bag of Cap rice.','364457126c',1200.99,0,30,'No color','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2021-12-20 00:00:00','2021-12-24 16:46:17',12),(2,4,'Rice Bag','50kg bag of Cap rice.','676cdcc6f6',1200.99,0,30,'No color','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2021-12-29 00:00:00','2021-12-24 17:24:11',56),(3,4,'VIJU MILK','500ml bag of chocolate Viju Milk drink.','7b31d4ef12',200.29,30,10,'Chocolate','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2022-12-29 00:00:00','2021-12-24 17:44:13',45),(4,3,'Hand Gloves','2 pair of male hand gloves','16ce73cd31',100.99,10,10,'Black, Red','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2021-12-31 00:00:00','2021-12-24 22:10:32',2),(5,3,'Tuxedo','Male and female tuxedo','16ce73cd31',2000.99,16,8,'Brown, Black, Red, White','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2021-12-31 00:00:00','2021-12-24 22:13:48',13),(7,5,'MIC','Mic for singing and making presentation videos','16ce73cd31',5000.99,0,130,'Black','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2022-03-30 00:00:00','2021-12-24 22:16:38',4),(8,5,'Electric Guiter','High jams electric guiter','16ce73cd31',2000.39,12,30,'Black, Red & White','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2022-03-30 00:00:00','2021-12-24 22:17:43',7),(9,5,'Mixers','High jend mixer for any kind of music','16ce73cd31',850.39,12,15,'Black, Red & Whites','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2022-03-30 00:00:00','2021-12-24 22:18:46',32),(10,5,'Mixer','High jend mixer for any kind of music','9a5fb0764f',800.39,2,10,'Black, Red & White','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2022-03-30 00:00:00','2021-12-26 12:24:08',11),(11,5,'Mixer','High jend mixer for any kind of music','9a5fb0764f',800.39,2,10,'Black, Red & White','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2022-03-30 00:00:00','2021-12-26 12:24:43',9),(12,5,'Sax','High jend Sax for any kind of music','30123cf2bc',200.39,88,10,'Black, Red & White','Bank Transfer, Card, Payment on delivery','https://img-url-1, https://img-url-2, https://img-url-3','2021-12-31 00:00:00','2021-12-26 12:31:08',33);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `Gender` varchar(5) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `ImgUrl` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Victor Daberechi','Nwogu','$2b$10$Lf6X87oHMaEbHuTulJMgJehZYM.KphJUvbE3ExnEl76FcSGiRXAeK','vicmee76@gmail.com','2021-12-22 01:42:54','2021-12-22 01:42:54','M','09087654321','https://1.bp.blogspot.com/-Q45319SNgB8/YSo43rh_adI/AAAAAAAAWJ4/YP-0r8bhIG0Gmmw5KfpKmoJL6PagyPqyQCLcBGAsYHQ/s0/cute-dp-images-cute-profile-pictures%2B%25281%2529.jpg'),(12,'Ebenezer','Nwogu','$2b$10$hBAKeVUSMBAKS1LFADbWf.q7NCgMyqXiUjLLow4E/Na4hTo22ywI.','vicmee76@hotmail.com','2021-12-22 02:12:36','2021-12-22 02:12:36','M','09087654321','https://1.bp.blogspot.com/-Q45319SNgB8/YSo43rh_adI/AAAAAAAAWJ4/YP-0r8bhIG0Gmmw5KfpKmoJL6PagyPqyQCLcBGAsYHQ/s0/cute-dp-images-cute-profile-pictures%2B%25281%2529.jpg'),(14,'JAMES','BROWN','$2b$10$EqzJQAz3GC9KPbW1BWwfLuxZscbDl9piVaWWtXt9pR/yMOmHtPsQu','jamess@hotmail.com','2021-12-26 00:09:54','2021-12-26 00:09:54','M','09087654321','https://1.bp.blogspot.com/-Q45319SNgB8/YSo43rh_adI/AAAAAAAAWJ4/YP-0r8bhIG0Gmmw5KfpKmoJL6PagyPqyQCLcBGAsYHQ/s0/cute-dp-images-cute-profile-pictures%2B%25281%2529.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-30  0:43:25
