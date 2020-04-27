-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: queues
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `Agent_Table`
--

DROP TABLE IF EXISTS `Agent_Table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Agent_Table` (
  `AgentID` int(11) NOT NULL AUTO_INCREMENT,
  `Skill1` varchar(45) DEFAULT NULL,
  `Skill2` varchar(45) DEFAULT NULL,
  `Skill3` varchar(45) DEFAULT NULL,
  `Name` varchar(45) NOT NULL,
  `AvailStatus` varchar(45) NOT NULL,
  `NumOfCus` int(11) NOT NULL,
  `TimeAvail` timestamp(6) NULL DEFAULT NULL,
  `jid_a` longtext NOT NULL,
  PRIMARY KEY (`AgentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agent_Table`
--

LOCK TABLES `Agent_Table` WRITE;
/*!40000 ALTER TABLE `Agent_Table` DISABLE KEYS */;
INSERT INTO `Agent_Table` VALUES (1,'Phone','Tablet','Computer','Bruce','Busy',-96,'2020-03-26 08:47:57.000000','johnisdumb123'),(2,'mobile','Tablet','Computer','James','Busy',5,'2020-03-25 07:29:13.000000',''),(3,'mobile','Tablet','Computer','ryan','Busy',4,'2020-03-25 07:28:13.000000',''),(4,'Phone','Computer',NULL,'John','Busy',1,'2020-03-26 08:45:58.000000','osubdfoubf3134'),(5,'Phone',NULL,NULL,'Leonard','Busy',1,'2020-03-26 08:52:54.000000','johnisdumb1234');
/*!40000 ALTER TABLE `Agent_Table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Q1`
--

DROP TABLE IF EXISTS `Q1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Q1` (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `StrID` varchar(45) NOT NULL,
  `JID_IM` longtext NOT NULL,
  `Skill` varchar(45) NOT NULL,
  `TimeRegistered` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Q1`
--

LOCK TABLES `Q1` WRITE;
/*!40000 ALTER TABLE `Q1` DISABLE KEYS */;
INSERT INTO `Q1` VALUES (1,'Ryan','Gen','100234','h1h3fkcn','Phone','2020-03-24 12:34:51.472839'),(2,'Celine ','Tan','1039274','kehg3o1','Tablet','2020-03-25 12:34:51.472839'),(3,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(4,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(5,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(6,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(7,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(8,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(9,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(10,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(11,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(12,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(13,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(14,'Bob','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(15,'Bobs','Tan','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(16,'Bobs','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(17,'Bobs','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(18,'Bobs','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839'),(19,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:34:51.472839');
/*!40000 ALTER TABLE `Q1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Q2`
--

DROP TABLE IF EXISTS `Q2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Q2` (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `StrID` varchar(45) NOT NULL,
  `JID_IM` longtext NOT NULL,
  `Skill` varchar(45) NOT NULL,
  `TimeRegistered` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Q2`
--

LOCK TABLES `Q2` WRITE;
/*!40000 ALTER TABLE `Q2` DISABLE KEYS */;
INSERT INTO `Q2` VALUES (2,'Tom1234','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 12:35:18.249541'),(3,'Adam','West','234','obfoabfaosf8803fafjb','Phone','2020-03-26 08:20:40.101796');
/*!40000 ALTER TABLE `Q2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Q3`
--

DROP TABLE IF EXISTS `Q3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Q3` (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `StrID` varchar(45) NOT NULL,
  `JID_IM` longtext NOT NULL,
  `Skill` varchar(45) NOT NULL,
  `TimeRegistered` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Q3`
--

LOCK TABLES `Q3` WRITE;
/*!40000 ALTER TABLE `Q3` DISABLE KEYS */;
INSERT INTO `Q3` VALUES (1,'Bruce','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-26 08:20:02.028615'),(2,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(3,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(4,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(5,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(6,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(7,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(8,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(9,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(10,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(11,'Bobs123','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(12,'Bobs1234','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(13,'Bobs1234','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(14,'Tom1234','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(15,'Tom1234','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(16,'Tom1234','Lee','1234','hdboaifb2ijuvdbsiof','Phone','2020-03-25 01:23:38.724362'),(17,'Tommy','Lee','1231','hdboaifb2ijuvdbsiof','Tablet','2020-03-25 01:25:05.573240'),(18,'Tommy','Lee','1231','hdboaifb2ijuvdbsiof','Tablet','2020-03-25 01:38:05.882354'),(19,'Tommy','Lee','1231','hdboaifb2ijuvdbsiof','Tablet','2020-03-25 01:44:55.708472'),(20,'Seyong','Lee','1231','hdboaifb2ijuvdbsiof','Tablet','2020-03-25 07:25:58.878012'),(21,'first','last','5e7b2a1d35c8367f99b8eeca','d041b0217987465f8458e8dae9321a31@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 09:53:33.360994'),(22,'first','last','5e7b2a3835c8367f99b8eee5','82b4d1eef8704ac399bbdccc443835d9@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 09:54:00.577694'),(23,'first','last','5e7b2a9535c8367f99b8ef12','67398b18ad854d9c82811af506cee023@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 09:55:33.578862'),(24,'first','last','5e7b2c8935c8367f99b8ef7a','e9a22b8534e642c0ab545ba612c49c32@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 10:03:53.710170'),(25,'asd','asd','5e7b2cfd35c8367f99b8ef8c','13b1de8c460e4374988b4ec18f6d9e32@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 10:05:49.605901'),(26,'asd','asd','5e7b2e7835c8367f99b8efa7','4bb8ddcd53a8422f8d827c2984b664b2@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 10:12:08.289107'),(27,'asd','asdd','5e7b2e8b35c8367f99b8efb0','cdc405687bf54476b763361e64ca3cf2@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 10:12:27.426059'),(28,'asdd','asdadada','5e7b2eb535c8367f99b8efc2','9ab00eb0f5ac44f4abe263c7ee170ac3@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 10:13:09.958832'),(29,'asdd','asdadada','5e7b2ec935c8367f99b8efcb','d6659efe7ff94ab182cdd8cafbfaf3db@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Tablet','2020-03-25 10:13:29.892803');
/*!40000 ALTER TABLE `Q3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Skills`
--

DROP TABLE IF EXISTS `Skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Skills` (
  `SkillID` int(11) NOT NULL,
  `Skill` varchar(45) NOT NULL,
  PRIMARY KEY (`SkillID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Skills`
--

LOCK TABLES `Skills` WRITE;
/*!40000 ALTER TABLE `Skills` DISABLE KEYS */;
INSERT INTO `Skills` VALUES (1,'Phone'),(2,'Computer'),(3,'Tablet'),(4,'Television'),(5,'Miscallaneous');
/*!40000 ALTER TABLE `Skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-26 17:11:56
