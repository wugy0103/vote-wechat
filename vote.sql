/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Version : 50621
 Source Host           : localhost
 Source Database       : RUNOOB

 Target Server Version : 50621
 File Encoding         : utf-8

 Date: 05/18/2016 11:44:07 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `vote`
-- ----------------------------
DROP TABLE IF EXISTS `userlog`;
CREATE TABLE `userlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` char(20) NOT NULL DEFAULT '' COMMENT '台山供电局',
  `court` char(20) NOT NULL DEFAULT '' COMMENT '供电局评价',
  `ep` char(20) NOT NULL DEFAULT '' COMMENT '台山市环境保护局',
  `fs` char(20) NOT NULL DEFAULT '' COMMENT '市食品药品监督管理局',
  `pp` char(20) NOT NULL DEFAULT '' COMMENT '台山市人民检察院',
  `ps` char(20) NOT NULL DEFAULT '' COMMENT '台山市人民法院',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `level`;
CREATE TABLE `level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '' COMMENT '单位名称',
  `aLevel` int(11) NOT NULL DEFAULT '0' COMMENT 'a评价的数量',
  `bLevel` int(11) NOT NULL DEFAULT '0' COMMENT 'b评价的数量',
  `cLevel` int(11) NOT NULL DEFAULT '0' COMMENT 'c评价的数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `websites`
-- ----------------------------
BEGIN;
INSERT INTO `level` VALUES ('1', '市环保局', '0', '0', '0'), ('2', '市食监局', '0', '0', '0'), ('3', '市检察院', '0', '0', '0'), ('4', '市法院', '0', '0', '0'), ('5', '市供电局', '0', '0', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
