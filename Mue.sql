/*
 Navicat Premium Data Transfer

 Source Server         : CS4280
 Source Server Type    : MySQL
 Source Server Version : 50640
 Source Host           : cs4280-cw2.cvnekcb5vorc.us-east-2.rds.amazonaws.com:3306
 Source Schema         : Mue

 Target Server Type    : MySQL
 Target Server Version : 50640
 File Encoding         : 65001

 Date: 22/04/2019 23:52:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for album
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `label` varchar(100) DEFAULT '',
  `release_date` date NOT NULL,
  `thumbnail` varchar(200) NOT NULL,
  `status` int(3) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of album
-- ----------------------------
BEGIN;
INSERT INTO `album` VALUES (1, '123', '123', 'Jpop', '2019-04-01', 'd6365974-bac0-46c4-b92b-1add4ceaab7d.jpg', 0, '2019-04-22 15:25:24');
INSERT INTO `album` VALUES (2, 'First Album', 'BTS', 'Kpop', '2019-04-02', '5c2988a2-487e-4a19-9a46-4a3454985182.jpg', 0, '2019-04-22 15:34:49');
INSERT INTO `album` VALUES (3, 'The New Album', 'Ed Sheeran', 'Chill', '2019-01-16', '939b2238-e347-47d8-8dc2-5668cc4705f5.jpg', 0, '2019-04-22 15:36:53');
INSERT INTO `album` VALUES (4, 'Eason Best', 'Eason', 'Cantopop', '2019-04-09', 'dd0be9a2-c4af-414e-816d-235969e78b9e.jpg', 0, '2019-04-22 15:42:15');
INSERT INTO `album` VALUES (5, 'Joey Best Album', 'Joey', 'Cantopop', '2019-02-12', '75453a02-449c-4024-8ecb-e5c42e8c3a7b.jpg', 0, '2019-04-22 15:43:12');
COMMIT;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `user_id` int(10) NOT NULL,
  `album_id` int(10) NOT NULL,
  `track_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`album_id`,`track_id`),
  KEY `fk_cart_album_id` (`album_id`),
  KEY `fk_cart_track_id` (`track_id`),
  CONSTRAINT `fk_cart_album_id` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT `fk_cart_track_id` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `status` int(3) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_order_user_id` (`user_id`),
  CONSTRAINT `fk_order_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of order
-- ----------------------------
BEGIN;
INSERT INTO `order` VALUES (1, 4, 0, '2019-04-10 15:43:50');
INSERT INTO `order` VALUES (3, 4, 0, '2019-04-11 15:44:58');
INSERT INTO `order` VALUES (4, 4, 0, '2019-04-12 15:48:40');
INSERT INTO `order` VALUES (5, 4, 0, '2019-04-13 15:48:59');
COMMIT;

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `order_id` int(10) NOT NULL,
  `album_id` int(10) NOT NULL,
  `track_id` int(10) NOT NULL,
  `price` int(6) NOT NULL,
  `refundable` tinyint(1) DEFAULT '1',
  `status` int(3) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_order_item_order_id` (`order_id`),
  KEY `fk_order_item_album_id` (`album_id`),
  KEY `fk_order_item_track_id` (`track_id`),
  CONSTRAINT `fk_order_item_album_id` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT `fk_order_item_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `fk_order_item_track_id` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of order_item
-- ----------------------------
BEGIN;
INSERT INTO `order_item` VALUES (1, 1, 2, 2, 15, 1, 2);
INSERT INTO `order_item` VALUES (2, 1, 2, 3, 13, 1, 0);
INSERT INTO `order_item` VALUES (3, 1, 2, 4, 25, 1, 0);
INSERT INTO `order_item` VALUES (4, 1, 2, 5, 35, 1, 0);
INSERT INTO `order_item` VALUES (5, 1, 2, 6, 10, 1, 0);
INSERT INTO `order_item` VALUES (6, 3, 1, 1, 83, 0, 0);
INSERT INTO `order_item` VALUES (7, 4, 5, 10, 123, 1, 0);
INSERT INTO `order_item` VALUES (8, 5, 4, 9, 123, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for track
-- ----------------------------
DROP TABLE IF EXISTS `track`;
CREATE TABLE `track` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `album_id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `length` int(6) NOT NULL,
  `price` int(6) NOT NULL,
  `quantity` int(6) NOT NULL,
  `file` varchar(200) NOT NULL,
  `file_preview` varchar(200) NOT NULL,
  `status` int(3) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_track_album_id` (`album_id`),
  CONSTRAINT `fk_track_album_id` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of track
-- ----------------------------
BEGIN;
INSERT INTO `track` VALUES (1, 1, '123', '123', 335, 123, 122, '8d01aff3-b86e-443c-bd6c-8efbd7943677.mp3', '70fc5ad0-819c-4bbc-89a1-46f37e7e993b.mp3', 0, '2019-04-22 15:25:24');
INSERT INTO `track` VALUES (2, 2, 'On My Way', 'BTS', 242, 15, 199, '8d97c529-6602-4cbc-b20f-04c206a84558.mp3', 'bfa99876-7902-4eaa-adef-13dbc10dbb6d.mp3', 0, '2019-04-22 15:34:49');
INSERT INTO `track` VALUES (3, 2, 'SOS', 'BTS', 215, 13, 199, 'd13740d9-7150-43e6-87fe-5d0d5078bd2e.mp3', '5e1459cd-acf2-4924-b545-74c352ecf946.mp3', 0, '2019-04-22 15:34:50');
INSERT INTO `track` VALUES (4, 2, 'ABC', 'BTS', 269, 25, 199, '8905903c-3360-412a-916f-e376b9999254.mp3', '1436fa17-982b-4ab2-93ac-d322f9e5245e.mp3', 0, '2019-04-22 15:34:50');
INSERT INTO `track` VALUES (5, 2, 'Old Town', 'BTS', 249, 35, 199, '98d617e7-da1d-4d98-9436-d483536de85e.mp3', '67c2adae-b6c4-4e3b-97e5-a4562a068d70.mp3', 0, '2019-04-22 15:34:50');
INSERT INTO `track` VALUES (6, 2, 'Don\'t Know', 'BTS', 203, 10, 99, '9ff59213-4f19-4fff-a7c6-5ab2782ff821.mp3', 'abc00c11-058f-42f4-8fda-d0b1b25ce5ba.mp3', 0, '2019-04-22 15:34:51');
INSERT INTO `track` VALUES (7, 3, 'First', 'Ed Sheeran', 180, 100, 1000, '0922587b-5b64-4eab-8525-02ea0c4615be.mp3', '83722092-53f5-40e5-b261-62b009ddadee.mp3', 0, '2019-04-22 15:36:53');
INSERT INTO `track` VALUES (8, 3, 'Second', 'Ed Sheeran', 160, 10, 2000, '47ae1516-8608-412d-9397-3efc21632720.mp3', 'c86eed07-2b5d-43a9-9df2-be10a5001e77.mp3', 0, '2019-04-22 15:36:54');
INSERT INTO `track` VALUES (9, 4, '123', 'Eason', 181, 123, 122, 'ad065590-323b-4ef8-9352-fbbceaa13b30.mp3', 'ed9bf4b0-792b-4429-8988-e8fb154e427f.mp3', 0, '2019-04-22 15:42:16');
INSERT INTO `track` VALUES (10, 5, 'First', 'Joey', 215, 123, 122, '76c38aaa-4ff1-49b2-bba4-e1ba222ba6e3.mp3', '417aa716-358a-46c9-aa95-ddc62c9764ac.mp3', 0, '2019-04-22 15:43:12');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `point` int(11) DEFAULT '0',
  `role` varchar(10) DEFAULT '',
  `status` int(3) DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', '$2b$10$FPPnqYcx09c1x3pc9ojSpenoh/9nKVSF3xB0FoGCK6WwmX6gzdpZO', 0, 'ADMIN', 0, '2019-04-22 15:06:43');
INSERT INTO `user` VALUES (2, 'admin2', '$2b$10$U7t256g5A3iyKzZcxi33LetlObfxqTEBNHLNp1gKNUGzPtELtP9oW', 0, 'ADMIN', 0, '2019-04-22 15:07:35');
INSERT INTO `user` VALUES (3, 'admin3', '$2b$10$c8vVDnE4s1sUJCQcfSHbn.HbByBNucOxdWoOYIcQCzL407glTRANC', 0, 'ADMIN', 0, '2019-04-22 15:07:48');
INSERT INTO `user` VALUES (4, 't1', '$2b$10$C7qK7fXf0i8LJMbvZcy6KeSQnosk5z52CkDnbrdk6UNYDCg3IWdX6', 175, '', 0, '2019-04-22 15:08:34');
INSERT INTO `user` VALUES (6, 't2', '$2b$10$6.gpXSEhK./SVShZnmc1ReSGd8tK/YH0qh.L.R4odOtjNWUANZj66', 0, '', 0, '2019-04-22 15:08:58');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
