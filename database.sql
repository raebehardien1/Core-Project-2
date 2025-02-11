-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: hr
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `attendanceandleave`
--

DROP TABLE IF EXISTS `attendanceandleave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendanceandleave` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `date` date NOT NULL,
  `attendance_status` enum('Present','Absent') DEFAULT 'Present',
  `leave_reason` varchar(255) DEFAULT NULL,
  `leave_status` enum('Approved','Pending','Denied') DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `employee_id` (`employee_id`),
  KEY `idx_record_id` (`record_id`),
  CONSTRAINT `attendanceandleave_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendanceandleave`
--

LOCK TABLES `attendanceandleave` WRITE;
/*!40000 ALTER TABLE `attendanceandleave` DISABLE KEYS */;
INSERT INTO `attendanceandleave` VALUES (1,1,'2024-11-25','Present',NULL,NULL),(2,1,'2024-11-26','Absent',NULL,NULL),(3,1,'2024-11-27','Present',NULL,NULL),(4,1,'2024-11-28','Present',NULL,NULL),(5,1,'2024-11-29','Present',NULL,NULL),(6,2,'2024-11-25','Present',NULL,NULL),(7,2,'2024-11-26','Present',NULL,NULL),(8,2,'2024-11-27','Absent',NULL,NULL),(9,2,'2024-11-28','Present',NULL,NULL),(10,2,'2024-11-29','Present',NULL,NULL),(11,3,'2024-11-25','Present',NULL,NULL),(12,3,'2024-11-26','Present',NULL,NULL),(13,3,'2024-11-27','Present',NULL,NULL),(14,3,'2024-11-28','Absent',NULL,NULL),(15,3,'2024-11-29','Present',NULL,NULL),(16,4,'2024-11-25','Absent',NULL,NULL),(17,4,'2024-11-26','Present',NULL,NULL),(18,4,'2024-11-27','Present',NULL,NULL),(19,4,'2024-11-28','Present',NULL,NULL),(20,4,'2024-11-29','Present',NULL,NULL),(21,5,'2024-11-25','Present',NULL,NULL),(22,5,'2024-11-26','Present',NULL,NULL),(23,5,'2024-11-27','Absent',NULL,NULL),(24,5,'2024-11-28','Present',NULL,NULL),(25,5,'2024-11-29','Present',NULL,NULL),(26,6,'2024-11-25','Present',NULL,NULL),(27,6,'2024-11-26','Present',NULL,NULL),(28,6,'2024-11-27','Absent',NULL,NULL),(29,6,'2024-11-28','Present',NULL,NULL),(30,6,'2024-11-29','Present',NULL,NULL),(31,7,'2024-11-25','Present',NULL,NULL),(32,7,'2024-11-26','Present',NULL,NULL),(33,7,'2024-11-27','Present',NULL,NULL),(34,7,'2024-11-28','Absent',NULL,NULL),(35,7,'2024-11-29','Present',NULL,NULL),(36,8,'2024-11-25','Present',NULL,NULL),(37,8,'2024-11-26','Absent',NULL,NULL),(38,8,'2024-11-27','Present',NULL,NULL),(39,8,'2024-11-28','Present',NULL,NULL),(40,8,'2024-11-29','Present',NULL,NULL),(41,9,'2024-11-25','Present',NULL,NULL),(42,9,'2024-11-26','Present',NULL,NULL),(43,9,'2024-11-27','Present',NULL,NULL),(44,9,'2024-11-28','Absent',NULL,NULL),(45,9,'2024-11-29','Present',NULL,NULL),(46,10,'2024-11-25','Present',NULL,NULL),(47,10,'2024-11-26','Present',NULL,NULL),(48,10,'2024-11-27','Absent',NULL,NULL),(49,10,'2024-11-28','Present',NULL,NULL),(50,10,'2024-11-29','Present',NULL,NULL),(51,1,'2024-11-22',NULL,'Sick Leave','Approved'),(52,1,'2024-12-01',NULL,'Personal','Pending'),(53,2,'2024-11-15',NULL,'Family Responsibility','Denied'),(54,2,'2024-12-02',NULL,'Vacation','Approved'),(55,3,'2024-11-10',NULL,'Medical Appointment','Approved'),(56,3,'2024-12-05',NULL,'Personal','Pending'),(57,4,'2024-11-20',NULL,'Bereavement','Approved'),(58,5,'2024-12-01',NULL,'Childcare','Pending'),(59,6,'2024-11-18',NULL,'Sick Leave','Approved'),(60,7,'2024-11-22',NULL,'Vacation','Pending'),(61,8,'2024-12-02',NULL,'Medical Appointment','Approved'),(62,9,'2024-11-19',NULL,'Childcare','Denied'),(63,10,'2024-12-03',NULL,'Vacation','Pending');
/*!40000 ALTER TABLE `attendanceandleave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `base_salary` decimal(10,2) NOT NULL,
  `employment_history` text,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(225) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `idx_employee_id` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Sibongile Nkosi','Software Engineer','Development',70000.00,'Joined in 2015, promoted to Senior in 2018','sibongile.nkosi@moderntech.com','Sibongile_Nkosi','password1'),(2,'Lungile Moyo','HR Manager','HR',80000.00,'Joined in 2013, promoted to Manager in 2017','lungile.moyo@moderntech.com','Lungile_Moyo','password2'),(3,'Thabo Molefe','Quality Analyst','QA',55000.00,'Joined in 2018','thabo.molefe@moderntech.com','Thabo_Molefe','password3'),(4,'Keshav Naidoo','Sales Representative','Sales',60000.00,'Joined in 2020','keshav.naidoo@moderntech.com','Keshav_Naidoo','password4'),(5,'Zanele Khumalo','Marketing Specialist','Marketing',58000.00,'Joined in 2019','zanele.khumalo@moderntech.com','Zanele_Khumalo','password5'),(6,'Sipho Zulu','UI/UX Designer','Design',65000.00,'Joined in 2016','sipho.zulu@moderntech.com','Sipho_Zulu','password6'),(7,'Naledi Moeketsi','DevOps Engineer','IT',72000.00,'Joined in 2017','naledi.moeketsi@moderntech.com','Naledi_Moeketsi','password7'),(8,'Farai Gumbo','Content Strategist','Marketing',56000.00,'Joined in 2021','farai.gumbo@moderntech.com','Farai_Gumbo','password8'),(9,'Karabo Dlamini','Accountant','Finance',62000.00,'Joined in 2018','karabo.dlamini@moderntech.com','Karabo_Dlamini','password9'),(10,'Fatima Patel','Customer Support Lead','Support',58000.00,'Joined in 2016','fatima.patel@moderntech.com','Fatima_Patel','password10'),(12,'siya','it','hr',27000.00,'unemployed','siyakolisi@gmail.com','siya','kolisi');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `payroll_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `hours_worked` int NOT NULL,
  `leave_deductions` int NOT NULL,
  `salary_paid` decimal(10,2) NOT NULL,
  `payroll_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`payroll_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `payroll_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

LOCK TABLES `payroll` WRITE;
/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
INSERT INTO `payroll` VALUES (1,1,160,8,69500.00,'2025-02-04 12:17:41'),(2,2,150,10,79000.00,'2025-02-04 12:17:41'),(3,3,170,4,54800.00,'2025-02-04 12:17:41'),(4,4,165,6,59700.00,'2025-02-04 12:17:41'),(5,5,158,5,57850.00,'2025-02-04 12:17:41'),(6,6,168,2,64800.00,'2025-02-04 12:17:41'),(7,7,175,3,71800.00,'2025-02-04 12:17:41'),(8,8,160,0,56000.00,'2025-02-04 12:17:41'),(9,9,155,5,61500.00,'2025-02-04 12:17:41'),(10,10,162,4,57750.00,'2025-02-04 12:17:41'),(16,1,6,9,45678.00,'4588'),(17,1,6,9,45678.00,'4588'),(18,1,6,9,45678.00,'4588'),(19,1,6,9,45678.00,'4588'),(20,1,6,9,45678.00,'4588'),(21,7,8,7,899.00,'676');
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-07 12:32:58
