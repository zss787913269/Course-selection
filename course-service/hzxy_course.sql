/*
Navicat MySQL Data Transfer

Source Server         : 6号机
Source Server Version : 50727
Source Host           : 192.168.31.216:3306
Source Database       : hzxy_course

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-04-20 09:53:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_entity
-- ----------------------------
DROP TABLE IF EXISTS `admin_entity`;
CREATE TABLE `admin_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_entity
-- ----------------------------
INSERT INTO `admin_entity` VALUES ('1', '1234', '123456');

-- ----------------------------
-- Table structure for comment_entity
-- ----------------------------
DROP TABLE IF EXISTS `comment_entity`;
CREATE TABLE `comment_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `studentNo` int(11) NOT NULL COMMENT '学生id',
  `createTime` varchar(255) NOT NULL COMMENT '创建时间',
  `courseNo` int(11) NOT NULL COMMENT '课程id',
  `msg` varchar(255) NOT NULL COMMENT '评论内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_entity
-- ----------------------------
INSERT INTO `comment_entity` VALUES ('1', '1', '2020-4-9 17:12', '1', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('2', '1', '2020-4-9 17:12', '1', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('3', '1', '2020-4-9 17:12', '1', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('4', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('5', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('6', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('7', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('8', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('9', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('10', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('11', '1', '2020-4-9 17:12', '2', '老师讲课好棒');
INSERT INTO `comment_entity` VALUES ('12', '1', '2020-4-15 12:6', '5', '加油');
INSERT INTO `comment_entity` VALUES ('13', '1', '2020-4-15 12:6', '5', '哈哈哈哈');
INSERT INTO `comment_entity` VALUES ('14', '1', '2020-4-15 12:6', '4', '额（︶︿︶）=凸');
INSERT INTO `comment_entity` VALUES ('15', '1', '2020-4-15 12:6', '4', '比距局域');
INSERT INTO `comment_entity` VALUES ('16', '1', '2020-4-15 12:7', '3', '辣鸡');
INSERT INTO `comment_entity` VALUES ('17', '1', '2020-4-15 12:7', '1', '？？？！！？！');
INSERT INTO `comment_entity` VALUES ('18', '2', '2020-4-15 12:8', '1', '什么鬼');
INSERT INTO `comment_entity` VALUES ('19', '2', '2020-4-15 12:9', '3', '同一个他');
INSERT INTO `comment_entity` VALUES ('20', '1', '2020-4-15 15:1', '4', '就留了');
INSERT INTO `comment_entity` VALUES ('21', '1', '2020-4-15 15:6', '3', '吞吞吐吐');
INSERT INTO `comment_entity` VALUES ('22', '1', '2020-4-15 15:6', '3', '噢噢口');
INSERT INTO `comment_entity` VALUES ('23', '1', '2020-4-15 15:6', '3', '啦啦啦课后题');
INSERT INTO `comment_entity` VALUES ('24', '1', '2020-4-15 15:6', '3', '雨就☔️');
INSERT INTO `comment_entity` VALUES ('25', '1', '2020-4-15 15:6', '3', '俞渝北区');
INSERT INTO `comment_entity` VALUES ('26', '1', '2020-4-15 15:6', '3', '哈哈哈哈功夫');
INSERT INTO `comment_entity` VALUES ('27', '1', '2020-4-15 15:7', '3', '嗯ヽ(○^㉨^)ﾉ♪');
INSERT INTO `comment_entity` VALUES ('28', '1', '2020-4-15 15:7', '3', '哦何以有羽翼，恐非平生魂');
INSERT INTO `comment_entity` VALUES ('29', '1', '2020-4-15 15:7', '1', '还好还好哈');
INSERT INTO `comment_entity` VALUES ('30', '1', '2020-4-15 15:7', '1', '你好');
INSERT INTO `comment_entity` VALUES ('31', '1', '2020-4-15 15:7', '1', '吃饭吗');
INSERT INTO `comment_entity` VALUES ('32', '1', '2020-4-15 15:8', '1', '在干嘛');
INSERT INTO `comment_entity` VALUES ('33', '1', '2020-4-15 15:8', '1', '副处级');
INSERT INTO `comment_entity` VALUES ('34', '1', '2020-4-15 15:8', '1', '不积极');
INSERT INTO `comment_entity` VALUES ('35', '1', '2020-4-15 15:8', '1', '斤斤计较哈哈');
INSERT INTO `comment_entity` VALUES ('36', '1', '2020-4-15 15:8', '1', '就看看紧急集合刚到了，我的吗丁啉');
INSERT INTO `comment_entity` VALUES ('37', '1', '2020-4-15 15:8', '1', '@');
INSERT INTO `comment_entity` VALUES ('38', '1', '2020-4-15 15:9', '5', '没有人');
INSERT INTO `comment_entity` VALUES ('39', '1', '2020-4-15 15:9', '5', '充电');
INSERT INTO `comment_entity` VALUES ('40', '3', '2020-4-16 9:40', '1', '就拒绝');
INSERT INTO `comment_entity` VALUES ('41', '3', '2020-4-16 18:37', '3', '滚滚滚');

-- ----------------------------
-- Table structure for correlation_entity
-- ----------------------------
DROP TABLE IF EXISTS `correlation_entity`;
CREATE TABLE `correlation_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseNo` int(11) NOT NULL,
  `studentNo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of correlation_entity
-- ----------------------------
INSERT INTO `correlation_entity` VALUES ('25', '1', '1');
INSERT INTO `correlation_entity` VALUES ('36', '5', '1');
INSERT INTO `correlation_entity` VALUES ('37', '4', '1');
INSERT INTO `correlation_entity` VALUES ('38', '3', '1');
INSERT INTO `correlation_entity` VALUES ('39', '1', '3');

-- ----------------------------
-- Table structure for course_entity
-- ----------------------------
DROP TABLE IF EXISTS `course_entity`;
CREATE TABLE `course_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseNo` int(11) NOT NULL COMMENT '课程编号',
  `courseName` varchar(255) NOT NULL COMMENT '课程名字',
  `courseTeacher` varchar(255) NOT NULL COMMENT '授课老师',
  `credit` int(11) NOT NULL COMMENT '学分',
  `courseCollege` varchar(255) NOT NULL COMMENT '开课学院',
  `address` varchar(255) NOT NULL,
  `typeID` int(11) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `courseInfo` varchar(255) NOT NULL,
  `courseTeacherId` int(11) NOT NULL,
  `courseTime` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_entity
-- ----------------------------
INSERT INTO `course_entity` VALUES ('1', '20191223', '疯狂JAVA2', '黄培强', '4', '信息学院', '逸夫楼308', '1', '/img/java.jpg', '本书并不是一本简单的Java入门教材，也不是一门“闭门造车”式的Java读物。本书来自于笔者十余年的Java培训经历，凝结了笔者一万余小时的授课经验，总结了数千名Java学员学习过程中的典型错误。', '1', '星期三 上午10：10- 11：50');
INSERT INTO `course_entity` VALUES ('2', '20191223', 'CSS3入门', '钟泽坤', '4', '信息学院', '逸夫楼308', '1', '/img/c.jpg', '本书并不是一本简单的Java入门教材，也不是一门“闭门造车”式的Java读物。本书来自于笔者十余年的Java培训经历，凝结了笔者一万余小时的授课经验，总结了数千名Java学员学习过程中的典型错误。', '2', '星期一 上午10：10- 11：50');
INSERT INTO `course_entity` VALUES ('3', '20191223', '中华上下五千年（上）', '黄培强', '4', '信息学院', '逸夫楼308', '2', '/img/sjjrs.jpg', '本书并不是一本简单的Java入门教材，也不是一门“闭门造车”式的Java读物。本书来自于笔者十余年的Java培训经历，凝结了笔者一万余小时的授课经验，总结了数千名Java学员学习过程中的典型错误。', '1', '星期三 上午10：10- 11：50');
INSERT INTO `course_entity` VALUES ('4', '20191223', 'javaScript进阶', '钟泽坤', '4', '信息学院', '逸夫楼308', '1', '/img/taiyu.jpg', '本书并不是一本简单的Java入门教材，也不是一门“闭门造车”式的Java读物。本书来自于笔者十余年的Java培训经历，凝结了笔者一万余小时的授课经验，总结了数千名Java学员学习过程中的典型错误。', '2', '星期六 上午10：10- 11：50');
INSERT INTO `course_entity` VALUES ('5', '20191223', '形式与政策3', '黄培强', '4', '信息学院', '逸夫楼308', '3', '/img/jrxlx.jpg', '本书并不是一本简单的Java入门教材，也不是一门“闭门造车”式的Java读物。本书来自于笔者十余年的Java培训经历，凝结了笔者一万余小时的授课经验，总结了数千名Java学员学习过程中的典型错误。', '1', '星期三 上午10：10- 11：50');

-- ----------------------------
-- Table structure for course_type_entity
-- ----------------------------
DROP TABLE IF EXISTS `course_type_entity`;
CREATE TABLE `course_type_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_type_entity
-- ----------------------------
INSERT INTO `course_type_entity` VALUES ('1', '公共课');
INSERT INTO `course_type_entity` VALUES ('2', '通识选修');
INSERT INTO `course_type_entity` VALUES ('3', '必修课');

-- ----------------------------
-- Table structure for histroy_entity
-- ----------------------------
DROP TABLE IF EXISTS `histroy_entity`;
CREATE TABLE `histroy_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentNo` int(11) NOT NULL,
  `courseNo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of histroy_entity
-- ----------------------------
INSERT INTO `histroy_entity` VALUES ('17', '3', '1');
INSERT INTO `histroy_entity` VALUES ('18', '3', '4');
INSERT INTO `histroy_entity` VALUES ('19', '3', '3');

-- ----------------------------
-- Table structure for like_entity
-- ----------------------------
DROP TABLE IF EXISTS `like_entity`;
CREATE TABLE `like_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseNo` int(11) NOT NULL,
  `studentNo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of like_entity
-- ----------------------------
INSERT INTO `like_entity` VALUES ('27', '3', '1');
INSERT INTO `like_entity` VALUES ('28', '1', '3');

-- ----------------------------
-- Table structure for notice_entity
-- ----------------------------
DROP TABLE IF EXISTS `notice_entity`;
CREATE TABLE `notice_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createTime` varchar(255) NOT NULL,
  `createName` varchar(255) NOT NULL,
  `uid` int(11) NOT NULL,
  `isSelected` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice_entity
-- ----------------------------
INSERT INTO `notice_entity` VALUES ('6', '统筹两个大局 指挥两个战场', '【学习进行时】3月，习近平总书记统筹国内国外两个大局，指挥新冠肺炎疫情防控和经济社会发展工作两个战场，一系列重要活动，意义十分重大。新华社《学习进行时》原创品牌栏目“讲习所”推出文章，和您一起体会。\r\n\r\n　　3月，习近平总书记主持召开多个重要会议，数次到地方考察调研，密集开展重要的多边双边外交活动，统筹国内国外两个大局，指挥新冠肺炎疫情防控和经济社会发展工作两个战场，一系列重要活动，意义十分重大。', '6', '2020-4-9 10:07', '钟泽坤', '2', 'false');
INSERT INTO `notice_entity` VALUES ('7', '六百岁故宫2020年首开直播', '闭馆七十多天后，故宫博物院的午门5日上午十点为中国网友们打开。5日、6日连续两天的3场网络直播，故宫以这种特殊形式揭开了600年庆生的序幕。', '1', '2020-4-9 10:07', '钟泽坤', '2', 'false');
INSERT INTO `notice_entity` VALUES ('8', '第二届“我爱大熊猫”国际少儿明信片绘画大赛启动', '“我爱大熊猫”国际少儿明信片绘画大赛始于2019年，以大熊猫科学发现150周年纪念及邮资明信片诞生150周年纪念为契机，是一项以坚定文化自信为指导，以弘扬中华传统文化、融汇现当代和外来文化为己任，盛邀全世界少年儿童共绘“我心中的大熊猫”的国际明信片设计赛事。首届大赛共征集到来自中国、乌克兰、缅甸、意大利、新西兰、英国、美国、墨西哥、肯尼亚等五大洲28个国家和地区的近2100套作品，最终由国内外艺术和教育领域的专家共同评出49套获奖作品。', '1', '2020-4-9', '钟泽坤', '2', 'false');
INSERT INTO `notice_entity` VALUES ('9', '俄著名作家邦达列夫逝世', '据俄总统网站30日发布的公告，普京在向邦达列夫家人所发的唁电中说，邦达列夫是苏联和俄罗斯的一代文学巨匠，他的逝世令人惋惜。普京说，邦达列夫是一个光荣时代的典型代表，他是一个诚实、有原则、正直的文学家和文艺批评家，是热爱祖国、忠于文学事业的典范。\r\n\r\n　　尤里·邦达列夫生于1924年3月15日，曾参加苏联卫国战争，并多次获得荣誉勋章。邦达列夫曾任俄罗斯作家协会主席，其著名作品有中篇小说《最后的炮轰》《营队请求炮火支援》、长篇小说《热的雪》《岸》等', '1', '2020-4-9', '钟泽坤', '2', 'false');
INSERT INTO `notice_entity` VALUES ('10', 'ffff', '烦烦烦烦烦烦烦烦烦烦烦烦', '1', '2020-4-9 17:12', '黄培强', '1', 'false');
INSERT INTO `notice_entity` VALUES ('11', 'ffff', '烦烦烦烦烦烦烦烦烦烦烦烦', '1', '2020-4-9 17:12', '黄培强', '1', 'false');
INSERT INTO `notice_entity` VALUES ('26', '还好还好哈', '过一次一分一分好吃', '1', '2020-4-10 16:22', '黄培强', '1', 'false');
INSERT INTO `notice_entity` VALUES ('29', '1', '1', '1', '2020-4-11 18:56', '黄培强', '1', 'false');
INSERT INTO `notice_entity` VALUES ('34', '1', '1', '1', '2020-4-15 12:11', '黄培强', '1', 'false');

-- ----------------------------
-- Table structure for student_entity
-- ----------------------------
DROP TABLE IF EXISTS `student_entity`;
CREATE TABLE `student_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL COMMENT '学号',
  `studetName` varchar(255) NOT NULL COMMENT '学生姓名',
  `gender` varchar(255) NOT NULL COMMENT '性别',
  `age` int(11) NOT NULL COMMENT '年龄',
  `studentClass` varchar(255) NOT NULL COMMENT '班级',
  `college` varchar(255) NOT NULL COMMENT '所属学院',
  `university` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student_entity
-- ----------------------------
INSERT INTO `student_entity` VALUES ('1', '12345', '91张先生', '1', '36', '2', '保安学院', '北京大学', '123456');
INSERT INTO `student_entity` VALUES ('2', '1610818076', '曹佳文', '1', '21', '3', '信息学院', '贺州学院', '123456');
INSERT INTO `student_entity` VALUES ('3', '1610818077', '安洪彬', '1', '21', '3', '信息学院', '贺州学院', '123456');
INSERT INTO `student_entity` VALUES ('4', '1610818078', '向丹怡', '1', '21', '3', '信息学院', '贺州学院', '123456');
INSERT INTO `student_entity` VALUES ('5', '1610818079', '钟泽坤', '1', '16', '3', '信息学院', '贺州学院', '123456');
INSERT INTO `student_entity` VALUES ('6', '1610818080', '黄培强', '2', '28', '3', '信息学院', '贺州学院', '123456');

-- ----------------------------
-- Table structure for teacher_entity
-- ----------------------------
DROP TABLE IF EXISTS `teacher_entity`;
CREATE TABLE `teacher_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherName` varchar(255) NOT NULL COMMENT '老师姓名',
  `gender` varchar(255) NOT NULL COMMENT '老师性别',
  `professor` varchar(255) NOT NULL COMMENT '老师职称',
  `college` varchar(255) NOT NULL COMMENT '所属院系',
  `authorUrl` varchar(255) NOT NULL,
  `account` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher_entity
-- ----------------------------
INSERT INTO `teacher_entity` VALUES ('1', '黄培强', '1', '教授', '332', '3', '123456', '123456');
INSERT INTO `teacher_entity` VALUES ('2', '钟泽坤', '1', '教授', '332', '3', '1610818011', '123456');
INSERT INTO `teacher_entity` VALUES ('3', '张昏聩', '1', '副教授', '332', '3', '123', '123456');

-- ----------------------------
-- Table structure for tearelation_entity
-- ----------------------------
DROP TABLE IF EXISTS `tearelation_entity`;
CREATE TABLE `tearelation_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseNo` int(11) NOT NULL,
  `teacherNo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tearelation_entity
-- ----------------------------
INSERT INTO `tearelation_entity` VALUES ('1', '1', '3');
INSERT INTO `tearelation_entity` VALUES ('2', '1', '1');
INSERT INTO `tearelation_entity` VALUES ('3', '1', '1');
