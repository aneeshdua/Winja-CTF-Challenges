DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `secret_table`;

CREATE TABLE `secret_table` (`secret` varchar(100) NOT NULL, PRIMARY KEY (secret));
INSERT INTO `secret_table` VALUES ('Oh No! You found my secret! Please dont tell the boss!');

CREATE TABLE `Users` (`username` varchar(50) NOT NULL, password varchar(50) NOT NULL, PRIMARY KEY (`username`,`password`));
INSERT INTO `Users` VALUES ('admin','7R20tfAp');
INSERT INTO `Users` VALUES ('tom', 'P$JBr8$0');
