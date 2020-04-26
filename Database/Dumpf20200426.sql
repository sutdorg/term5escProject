-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: queues
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
) ENGINE=InnoDB AUTO_INCREMENT=491 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agent_Table`
--

LOCK TABLES `Agent_Table` WRITE;
/*!40000 ALTER TABLE `Agent_Table` DISABLE KEYS */;
INSERT INTO `Agent_Table` VALUES (485,'Tablet','Phone','Computer','Test Agent 6','Offline',0,'2020-04-20 03:25:13.000000','1c9d3b0253a242a492ec234725d00c4f@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'),(486,'Phone','Computer','Tablet','Test Agent 5','Offline',0,NULL,'8bef6dc3f4244ee3a6dd80c7cc54b632@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'),(487,'Tablet',NULL,NULL,'Test Agent 4','Offline',3,'2020-04-20 04:00:04.000000','f4e8fc24a7664243943506fecfdf5471@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'),(488,'Computer',NULL,NULL,'Test Agent 3','Offline',0,NULL,'3c23bdefb45249258c219a9b38ae0613@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'),(489,'Phone',NULL,NULL,'Test Agent 2','Available',0,'2020-04-20 05:03:17.000000','d6aabfd1a348467a990f0dfcb94b5218@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'),(490,'Phone','Computer','Tablet','Test Agent 1','Offline',0,NULL,'d5a9fb4c34c14c55be39b57e04ffe19e@sandbox-all-in-one-rbx-prod-1.rainbow.sbg');
/*!40000 ALTER TABLE `Agent_Table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OngoingCalls`
--

DROP TABLE IF EXISTS `OngoingCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OngoingCalls` (
  `CALLID` int(11) NOT NULL AUTO_INCREMENT,
  `jid_c` longtext NOT NULL,
  `jid_a` longtext NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `StrID` varchar(45) DEFAULT NULL,
  `TimeRegistered` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`CALLID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OngoingCalls`
--

LOCK TABLES `OngoingCalls` WRITE;
/*!40000 ALTER TABLE `OngoingCalls` DISABLE KEYS */;
/*!40000 ALTER TABLE `OngoingCalls` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Q1`
--

LOCK TABLES `Q1` WRITE;
/*!40000 ALTER TABLE `Q1` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Q2`
--

LOCK TABLES `Q2` WRITE;
/*!40000 ALTER TABLE `Q2` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Q3`
--

LOCK TABLES `Q3` WRITE;
/*!40000 ALTER TABLE `Q3` DISABLE KEYS */;
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

--
-- Table structure for table `UpcomingCall`
--

DROP TABLE IF EXISTS `UpcomingCall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UpcomingCall` (
  `idUpcomingCall` int(11) NOT NULL AUTO_INCREMENT,
  `jid_a` longtext NOT NULL,
  `jid_c` longtext NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `StrID` varchar(45) DEFAULT NULL,
  `TimeRegistered` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`idUpcomingCall`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UpcomingCall`
--

LOCK TABLES `UpcomingCall` WRITE;
/*!40000 ALTER TABLE `UpcomingCall` DISABLE KEYS */;
INSERT INTO `UpcomingCall` VALUES (8,'1c9d3b0253a242a492ec234725d00c4f@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','d52e4f64e9694f978fa215c9682286c6@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Chaewoon','Kim','','2020-04-20 03:02:28.374000'),(9,'1c9d3b0253a242a492ec234725d00c4f@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','953503a0ddd14fa594a879650c9de6cf@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','Chaewoon','Kim','','2020-04-20 03:08:40.506000'),(10,'1c9d3b0253a242a492ec234725d00c4f@sandbox-all-in-one-rbx-prod-1.rainbow.sbg','100','Se','Yong','12','2020-04-20 03:08:40.506000');
/*!40000 ALTER TABLE `UpcomingCall` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'queues'
--
/*!50003 DROP PROCEDURE IF EXISTS `AGENTSTATUS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AGENTSTATUS`(
IN _AgentID INT,
IN _AvailStatus varchar(45),
IN _NumOfCus INT
)
BEGIN
	if _AgentID = 0 THEN

        SET _AgentID = last_insert_id();
	else
		update Agent_Table
        SET
        
        AvailStatus = _AvailStatus,
        NumOfCus = _NumOfCus
        WHERE AgentID = _AgentID;
	end if;
    
    select _AgentID AS 'AgentID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CREATEAGENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATEAGENT`(
IN _AgentID INT,
IN _Skill1 varchar(45),
IN _Skill2 varchar(45),
IN _SKill3 varchar(45),
IN _Name varchar(45),
IN _AvailStatus varchar(45),
IN _NumOfCus INT,
IN _jid_a LONGTEXT
)
BEGIN
	if _AvailStatus = "online" THEN
		INSERT INTO Agent_Table(Skill1,Skill2,Skill3,Name,AvailStatus,NumOfCus,jid_a,TimeAvail)
        VALUES (_Skill1,_Skill2,_Skill3,_Name,"Available",_NumOfCus,_jid_a,CURRENT_TIMESTAMP());
        
        SET _AgentID = last_insert_id();
	else
		INSERT INTO Agent_Table(Skill1,Skill2,Skill3,Name,AvailStatus,NumOfCus,jid_a)
        VALUES (_Skill1,_Skill2,_Skill3,_Name,"Offline",_NumOfCus,_jid_a);
        
        SET _AgentID = last_insert_id();
	end if;
    
    select _AgentID AS 'AgentID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CSUCCESS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CSUCCESS`(
IN _jid_a LONGTEXT,
IN _NumOfCus int,
IN _AvailStatus varchar(45)
)
BEGIN
	update Agent_Table
    SET
    NumOfCus = _NumOfCus,
    AvailStatus = _AvailStatus,
    TimeAvail = CURRENT_TIMESTAMP()
    WHERE jid_a = _jid_a;
    
    select _jid_a AS 'jid_a';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CUSAGENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CUSAGENT`(
IN _idUpcomingCall INT,
IN _jid_a LONGTEXT,
IN _jid_c LONGTEXT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _TimeRegistered TimeStamp(6)
)
BEGIN

		INSERT INTO UpcomingCall(jid_a,jid_c,FirstName,LastName,StrID,TimeRegistered)
        VALUES (_jid_a,_jid_c,_FirstName,_LastName,_StrID,_TimeRegistered);
        
        SET _idUpcomingCall = last_insert_id();

    
    select _idUpcomingCall AS 'idUpcomingCall';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITAGENTAVAILENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITAGENTAVAILENTRY`(
IN _jid_a LONGTEXT,
IN _AvailStatus varchar(45)
)
BEGIN
	if _AvailStatus = "Online" THEN
		update Agent_Table
        SET
        AvailStatus = "Available",
        TimeAvail = CURRENT_TIMESTAMP()
        WHERE jid_a = _jid_a;
	else 
		update Agent_Table
        SET
        AvailStatus = "Busy",
        TimeAvail = null
        WHERE jid_a = _jid_a;
	end if;
    
    select _jid_a AS 'jid_a';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITENTRY`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q1(FirstName,LastName,StrID,JID_IM,Skill)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill);
    
    SET _CustomerID = last_insert_id();
    
    elseif _CustomerID = 1 THEN
	INSERT INTO Q2(FirstName,LastName,StrID,JID_IM,Skill)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill);
    
    SET _CustomerID = last_insert_id();
    
    elseif _CustomerID = 2 THEN
	INSERT INTO Q3(FirstName,LastName,StrID,JID_IM,Skill)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill);
    
    SET _CustomerID = last_insert_id();
    
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITQ11ENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITQ11ENTRY`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q1(FirstName,LastName,StrID,JID_IM,Skill)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill);
    
    SET _CustomerID = last_insert_id();
    
    else
		update Q1
        SET
        FirstName = _FirstName,
        LastName = _LastName,
        StrID = _StrID,
        JID_IM = _JID_IM,
        Skill = _Skill
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITQ1ENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITQ1ENTRY`(
IN _CustomerID INT,
IN _Name varchar(45),
IN _Contact varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
		INSERT INTO Queue_1(Name,ContactInformation)
        VALUES (_Name,_Contact);
        
        SET _CustomerID = last_insert_id();
	else
		update Queue_1
        SET
        Name = _Name,
        ContactInformation = _Contact
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITQ22ENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITQ22ENTRY`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q2(FirstName,LastName,StrID,JID_IM,Skill)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill);
    
    SET _CustomerID = last_insert_id();
    
    else
		update Q2
        SET
        FirstName = _FirstName,
        LastName = _LastName,
        StrID = _StrID,
        JID_IM = _JID_IM,
        Skill = _Skill
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITQ2ENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITQ2ENTRY`(
IN _CustomerID INT,
IN _Name varchar(45),
IN _Contact varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
		INSERT INTO Queue_2(Name,ContactInformation)
        VALUES (_Name,_Contact);
        
        SET _CustomerID = last_insert_id();
	else
		update Queue_2
        SET
        Name = _Name,
        ContactInformation = _Contact
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITQ33ENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITQ33ENTRY`(IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q3(FirstName,LastName,StrID,JID_IM,Skill)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill);
    
    SET _CustomerID = last_insert_id();
    
    else
		update Q3
        SET
        FirstName = _FirstName,
        LastName = _LastName,
        StrID = _StrID,
        JID_IM = _JID_IM,
        Skill = _Skill
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EDITQ3ENTRY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITQ3ENTRY`(
IN _CustomerID INT,
IN _Name varchar(45),
IN _Contact varchar(45)
)
BEGIN
	if _CustomerID = 0 THEN
		INSERT INTO Queue_3(Name,ContactInformation)
        VALUES (_Name,_Contact);
        
        SET _CustomerID = last_insert_id();
	else
		update Queue_3
        SET
        Name = _Name,
        ContactInformation = _Contact
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ONGOING` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ONGOING`(
IN _CALLID INT,
IN _jid_a LONGTEXT,
IN _jid_c LONGTEXT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _TimeRegistered timestamp(6)
)
BEGIN
	if _TimeRegistered IS NULL THEN
		INSERT INTO OngoingCalls(jid_a,jid_c,FirstName,LastName,StrID,TimeRegistered)
		VALUES (_jid_a,_jid_c,_FirstName,_LastName,_StrID,current_timestamp());
        
		SET _CALLID = last_insert_id();

	else
		INSERT INTO OngoingCalls(jid_a,jid_c,FirstName,LastName,StrID,TimeRegistered)
		VALUES (_jid_a,_jid_c,_FirstName,_LastName,_StrID,_TimeRegistered);
        
		SET _CALLID = last_insert_id();
    end if;
    select _CALLID AS 'CALLID';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REROUTE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REROUTE`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45),
IN _TimeRegistered TimeStamp(6)
)
BEGIN
	if _CustomerID = 1 THEN
		INSERT INTO Q1(FirstName,LastName,StrID,JID_IM,Skill,TimeRegistered)
		VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill,_TimeRegistered);
		
		SET _CustomerID = last_insert_id();
    elseif _CustomerID = 2 THEN
		INSERT INTO Q2(FirstName,LastName,StrID,JID_IM,Skill,TimeRegistered)
		VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill,_TimeRegistered);
		
		SET _CustomerID = last_insert_id();
    elseif _CustomerID = 3 THEN
		INSERT INTO Q3(FirstName,LastName,StrID,JID_IM,Skill,TimeRegistered)
		VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill,_TimeRegistered);
		
		SET _CustomerID = last_insert_id();

	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REROUTE1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REROUTE1`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45),
IN _TimeRegistered TimeStamp(6)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q1(FirstName,LastName,StrID,JID_IM,Skill,TimeRegistered)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill,_TimeRegistered);
    
    SET _CustomerID = last_insert_id();
    
    else
		update Q1
        SET
        FirstName = _FirstName,
        LastName = _LastName,
        StrID = _StrID,
        JID_IM = _JID_IM,
        Skill = _Skill,
        TimeRegistered = _TimeRegistered
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REROUTE2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REROUTE2`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45),
IN _TimeRegistered TimeStamp(6)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q2(FirstName,LastName,StrID,JID_IM,Skill,TimeRegistered)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill,_TimeRegistered);
    
    SET _CustomerID = last_insert_id();
    
    else
		update Q2
        SET
        FirstName = _FirstName,
        LastName = _LastName,
        StrID = _StrID,
        JID_IM = _JID_IM,
        Skill = _Skill,
        TimeRegistered = _TimeRegistered
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REROUTE3` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REROUTE3`(
IN _CustomerID INT,
IN _FirstName varchar(45),
IN _LastName varchar(45),
IN _StrID varchar(45),
IN _JID_IM LONGTEXT,
IN _Skill varchar(45),
IN _TimeRegistered TimeStamp(6)
)
BEGIN
	if _CustomerID = 0 THEN
    INSERT INTO Q3(FirstName,LastName,StrID,JID_IM,Skill,TimeRegistered)
    VALUES(_FirstName,_LastName,_StrID,_JID_IM,_Skill,_TimeRegistered);
    
    SET _CustomerID = last_insert_id();
    
    else
		update Q3
        SET
        FirstName = _FirstName,
        LastName = _LastName,
        StrID = _StrID,
        JID_IM = _JID_IM,
        Skill = _Skill,
        TimeRegistered = _TimeRegistered
        WHERE CustomerID = _CustomerID;
	end if;
    
    select _CustomerID AS 'CustomerID';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-26 22:15:11
