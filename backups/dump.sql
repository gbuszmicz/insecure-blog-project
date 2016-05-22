# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.12)
# Database: sql_injection
# Generation Time: 2016-05-22 20:59:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text,
  `body` text,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(11) unsigned DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Draft',
  `tags` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;

INSERT INTO `posts` (`id`, `title`, `body`, `date`, `userId`, `status`, `tags`)
VALUES
	(1,'My adventures with React Native','I was incredibly excited watching the ReactConf video when they announced React Native. After many frustrating attempts to create great user experiences with PhoneGap, I had started to believe that the dream of using web technologies for mobile apps was dead. I’ve been using React on the web heavily for the past year and ever since I first grokked the “react” way of doing things, I felt like this was the future of web development. And now after using React Native for a full project, I have the same feeling that React Native is the future of mobile app development. I don’t think it will replace Objective-C or Swift. There will always be things that are better done native than through javascript. But React’s method of building UI’s is the future. I think React Native is the perfect example of the Hybrid App model. Use native Objective-C for what it’s good at, and web technologies for what they’re good at.','2016-04-24 12:00:00',1,'published','special, tag, example'),
	(2,'What I learned from 52 Medium articles','I took a deep dive into Pocket to search for advice from all the Medium articles I saved this year. Here are quotes (with links if you want to read more) with the best lessons from 52 articles, one for each week of the year.\nWhen you read on Medium, you’re reading and thinking with others — others who share your views, as well as those who don’t (which makes you smarter).\nI’m really happy to be here, I think this platform and community of writers/thinkers is fantastic. Hi everyone here.\nSøren Kierkegaard writes that we live life forward, but only understand it in reverse. At 18, I didn’t always appreciate the questions my education introduced to me at the time.\nNow, school’s in session at every moment.','2016-04-24 19:07:42',3,'published',NULL),
	(3,'Building a better package search with Orchestrate','NPM is wonderful. It’s an indispensable tool. But discovery sucks. So, let’s take advantage of Orchestrate’s powerful search functionality to index NPM & join it with Github data, so we can search for packages and easily pick the best one for our applications.\r\nWe’ll use a few different technologies to make this work.\r\n<ul>\r\n<li>Node.js for the backend.</li>\r\n<li>React.js for the frontend.</li>\r\n<li>Orchestrate for the database & search.</li>\r\n<li>AppFog for the server hosting.</li>\r\n</ul>\r\nCheck out the final application here: scoutjs.com\r\n<h3>Part 1: Data</h3>\r\n<p>\r\nWe’ll start by pulling in all the packages from NPM. Luckily this is pretty easy because NPM runs a CouchDB that we can clone all the data from. We’ll use Follow to get a feed of the data and then add each item to Orchestrate.\r\n</p>\r\n<p>\r\nWe’ll use Async to queue all the changes and add them into Orchestrate. We want to pause the NPM data stream at the max concurrent operations so we can throttle the connections. To do that we’ll use the pause() and resume() methods on the feed when the queue is full or empty.\r\n</p>\r\n<p>\r\nNext we need to normalize the NPM data. Since NPM is user submitted, the data can very package to package, so we’ll use npm-normalize to normalize some parts, and we’ll use custom functions to normalize the scripts and time fields.\r\n</p>','2016-04-26 19:09:27',1,'published',NULL),
	(18,'A cool title for my new post','<p>NPM is wonderful. It’s an indispensable tool. But discovery sucks. So, let’s take advantage of Orchestrate’s powerful search functionality to index NPM &amp; join it with Github data, so we can search for packages and easily pick the best one for our applications. We’ll use a few different technologies to make this work.</p><p><ul><li><span style=\"line-height: 1.5; font-size: 2rem;\">Node.js for the backend.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">React.js for the frontend.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">Orchestrate for the database &amp; search.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">AppFog for the server hosting.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">Check out the final application here: scoutjs.com</span><br></li></ul></p><h2>Part 1: Data</h2><p>We’ll start by pulling in all the packages from NPM. Luckily this is pretty ea y eso.</p><p><br></p>','2016-05-15 16:03:33',1,'Published',NULL),
	(19,'Prueba titulo','<p><b>NPM is wonderful</b>. It’s an indispensable tool. But discovery sucks. So, let’s take advantage of Orchestrate’s powerful search functionality to index <u>NPM &amp; join</u> it with Github data, so we can search for packages and easily pick the best one for our applications. We’ll use a few different technologies to make this work.</p><p><ul><li><span style=\"line-height: 1.5; font-size: 2rem;\">Node.js for the backend.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">React.js for the frontend.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">Orchestrate for the database &amp; search.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">AppFog for the server hosting.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">Check out the final application here: scoutjs.com</span><br></li></ul></p><h3>Part 1: Data</h3><p>We’ll start by pulling in all the packages from NPM. Luckily this is pretty ea y eso.</p>','2016-05-15 16:06:38',1,'Published','undefined'),
	(20,'Titulo prueba tags','<p>NPM is wonderful. It’s an indispensable tool. But discovery sucks. So, let’s take advantage of Orchestrate’s powerful search functionality to index NPM &amp; join it with Github data, so we can search for packages and easily pick the best one for our applications.&nbsp;</p><blockquote>We’ll use a few different technologies to make this work.</blockquote><p><ol><li><span style=\"line-height: 1.5; font-size: 2rem;\">Node.js for the backend.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">React.js for the frontend.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">Orchestrate for the database &amp; search.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">AppFog for the server hosting.</span><br></li><li><span style=\"line-height: 1.5; font-size: 2rem;\">Check out the final application here: scoutjs.com</span><br></li></ol></p><h2>Part 1: Data</h2><p>We’ll start by pulling in all the packages from NPM. Luckily this is pretty ea y eso.</p>','2016-05-15 16:08:27',1,'Published','mis, tags, van, aca'),
	(21,'Titulo','<p>esto es una prueba</p><h2>titulo h2</h2><p><i>texto italic</i></p><h3>titulo h3</h3><p><b>texto negrita</b></p>','2016-05-15 17:11:01',1,'Published','tag1, tag2');

/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT '',
  `password` varchar(40) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `isAdmin`, `firstname`, `lastname`, `avatar`, `description`)
VALUES
	(1,'gonzalo','5EBE2294ECD0E0F08EAB7690D2A6EE69',0,'Gonzalo','Buszmicz','https://lh3.googleusercontent.com/-Te19dG4AnhI/AAAAAAAAAAI/AAAAAAAADtY/K7GRUoS1UZI/s46-c-k-no.jpg','First, make sure that the version of node you are using is a stable version. You\'ll know this because it\'ll have an even major release number'),
	(2,'admin','9a618248b64db62d15b300a07b00580b',1,'Administrator',NULL,'https://d1973c4qjhao9m.cloudfront.net/patches/sysadmin_253x292.png','There\'s no place like 127.0.0.1'),
	(3,'marcelo','5EBE2294ECD0E0F08EAB7690D2A6EE69',0,'Marcelo','Funes','http://www.cartoonpics.net/data/media/37/Sponge_Bob_happy.jpg','First, make sure that the version of node you are using is a stable version. You\'ll know this because it\'ll have an even major release number.'),
	(4,'ramiro','5EBE2294ECD0E0F08EAB7690D2A6EE69',0,'Ramiro','Maldonado','http://www.framiq.com/wp-content/uploads/2015/07/superherotar_20150629_005017.png',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
