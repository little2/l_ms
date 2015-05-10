-- phpMyAdmin SQL Dump
-- version 2.11.9.5
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 建立日期: May 10, 2015, 06:59 PM
-- 伺服器版本: 5.6.15
-- PHP 版本: 5.4.24

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 資料庫: `little2lms`
--

-- --------------------------------------------------------

--
-- 資料表格式： `catalog`
--

CREATE TABLE IF NOT EXISTS `catalog` (
  `catalog_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_title` varchar(20) NOT NULL,
  PRIMARY KEY (`catalog_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

-- --------------------------------------------------------

--
-- 資料表格式： `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_title` varchar(30) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- 資料表格式： `course_member`
--

CREATE TABLE IF NOT EXISTS `course_member` (
  `course_member_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `course_progress` int(1) NOT NULL,
  PRIMARY KEY (`course_member_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=55 ;

-- --------------------------------------------------------

--
-- 資料表格式： `course_property`
--

CREATE TABLE IF NOT EXISTS `course_property` (
  `course_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `course_title` varchar(100) NOT NULL,
  `course_desc` text NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `course_member` int(11) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=47 ;

-- --------------------------------------------------------

--
-- 資料表格式： `course_sco`
--

CREATE TABLE IF NOT EXISTS `course_sco` (
  `course_sco_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `sco_id` int(11) NOT NULL,
  `sort_id` int(11) NOT NULL,
  PRIMARY KEY (`course_sco_id`),
  UNIQUE KEY `course_sco_id` (`course_sco_id`),
  KEY `course_sco_id_2` (`course_sco_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=44 ;

-- --------------------------------------------------------

--
-- 資料表格式： `discuss`
--

CREATE TABLE IF NOT EXISTS `discuss` (
  `discuss_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sco_id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`discuss_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

-- --------------------------------------------------------

--
-- 資料表格式： `exam_property`
--

CREATE TABLE IF NOT EXISTS `exam_property` (
  `sco_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pass_mark` int(11) NOT NULL,
  PRIMARY KEY (`sco_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

-- --------------------------------------------------------

--
-- 資料表格式： `group_member`
--

CREATE TABLE IF NOT EXISTS `group_member` (
  `group_member_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `role` varchar(3) NOT NULL,
  PRIMARY KEY (`group_member_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

-- --------------------------------------------------------

--
-- 資料表格式： `group_property`
--

CREATE TABLE IF NOT EXISTS `group_property` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_type` varchar(3) NOT NULL COMMENT 'S:系統 D:部門 N:一般',
  `group_title` varchar(30) NOT NULL,
  `group_parent_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37 ;

-- --------------------------------------------------------

--
-- 資料表格式： `homework_property`
--

CREATE TABLE IF NOT EXISTS `homework_property` (
  `sco_id` int(11) NOT NULL,
  `pass_mark` int(11) NOT NULL,
  `homework_desc` text NOT NULL,
  `homework_deadline` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表格式： `power_property`
--

CREATE TABLE IF NOT EXISTS `power_property` (
  `power_code` varchar(20) NOT NULL,
  `power_title` char(100) NOT NULL,
  `power_type` varchar(10) NOT NULL,
  `power_desc` text NOT NULL,
  PRIMARY KEY (`power_code`),
  UNIQUE KEY `power_code` (`power_code`),
  UNIQUE KEY `power_code_2` (`power_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表格式： `quiz_item`
--

CREATE TABLE IF NOT EXISTS `quiz_item` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '流水號',
  `qid` int(10) unsigned NOT NULL COMMENT '所屬題號',
  `sort_id` tinyint(4) NOT NULL COMMENT '呈現順序',
  `content` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=47 ;

-- --------------------------------------------------------

--
-- 資料表格式： `quiz_question`
--

CREATE TABLE IF NOT EXISTS `quiz_question` (
  `qid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'question id',
  `question` text CHARACTER SET utf8 NOT NULL COMMENT '考題題目',
  `quiz_type` varchar(10) CHARACTER SET utf8 NOT NULL COMMENT '考題類型',
  `answer` text CHARACTER SET utf8 NOT NULL COMMENT '正確答案',
  PRIMARY KEY (`qid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- 資料表格式： `quiz_section`
--

CREATE TABLE IF NOT EXISTS `quiz_section` (
  `sid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `section_desc` text NOT NULL COMMENT '題組說明',
  `sco_id` int(11) NOT NULL,
  `sort_id` int(11) NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `sid` (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- 資料表格式： `quiz_section_relation`
--

CREATE TABLE IF NOT EXISTS `quiz_section_relation` (
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  `qid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- 資料表格式： `reply`
--

CREATE TABLE IF NOT EXISTS `reply` (
  `reply_id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NOT NULL,
  `reply_content` text NOT NULL,
  `reply_datatime` datetime NOT NULL,
  `reply_uid` int(11) NOT NULL,
  `reply_to` int(11) NOT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=49 ;

-- --------------------------------------------------------

--
-- 資料表格式： `sco_log`
--

CREATE TABLE IF NOT EXISTS `sco_log` (
  `sco_log_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sco_id` int(11) NOT NULL,
  `reading_time` datetime NOT NULL,
  `begin_time` int(2) NOT NULL,
  `end_time` int(2) NOT NULL,
  `reading_length` int(2) NOT NULL,
  PRIMARY KEY (`sco_log_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=80 ;

-- --------------------------------------------------------

--
-- 資料表格式： `sco_property`
--

CREATE TABLE IF NOT EXISTS `sco_property` (
  `sco_id` int(11) NOT NULL AUTO_INCREMENT,
  `sco_title` varchar(100) NOT NULL,
  `sco_total_sec` int(10) unsigned NOT NULL,
  `sco_desc` text NOT NULL,
  `sco_author` varchar(20) NOT NULL,
  `sco_type` varchar(20) NOT NULL,
  `sco_path` varchar(200) NOT NULL,
  PRIMARY KEY (`sco_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=44 ;

-- --------------------------------------------------------

--
-- 資料表格式： `topic`
--

CREATE TABLE IF NOT EXISTS `topic` (
  `topic_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `topic_title` varchar(100) NOT NULL,
  `topic_content` text NOT NULL,
  `topic_uid` int(11) NOT NULL,
  `topic_datetime` datetime NOT NULL,
  `board_id` int(11) NOT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_course_sco`
--

CREATE TABLE IF NOT EXISTS `user_course_sco` (
  `user_course_sco_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `sco_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `progress` int(11) NOT NULL,
  `sort_id` int(11) NOT NULL,
  `result` varchar(2) NOT NULL,
  PRIMARY KEY (`user_course_sco_id`),
  UNIQUE KEY `course_sco_id` (`user_course_sco_id`),
  KEY `course_sco_id_2` (`user_course_sco_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=69 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_exam`
--

CREATE TABLE IF NOT EXISTS `user_exam` (
  `user_exam_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_exam_datetime` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `sco_id` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `result` varchar(2) NOT NULL DEFAULT 'U',
  PRIMARY KEY (`user_exam_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=71 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_exam_detail`
--

CREATE TABLE IF NOT EXISTS `user_exam_detail` (
  `user_exam_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_exam_id` int(11) NOT NULL,
  `qid` int(11) NOT NULL,
  `user_answer` varchar(100) NOT NULL,
  PRIMARY KEY (`user_exam_detail_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_gcontact`
--

CREATE TABLE IF NOT EXISTS `user_gcontact` (
  `user_id` int(11) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `gcontact_id` varchar(30) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birth_year` smallint(1) unsigned NOT NULL,
  `birth_month` tinyint(1) unsigned NOT NULL,
  `birth_day` tinyint(1) unsigned NOT NULL,
  `sensitivity` varchar(12) NOT NULL,
  `priority` varchar(10) NOT NULL,
  `givenName` varchar(20) NOT NULL,
  `familyName` varchar(20) NOT NULL,
  `fileAs` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `givenName_yomi` varchar(20) NOT NULL,
  `familyName_yomi` varchar(20) NOT NULL,
  `occupation` varchar(20) NOT NULL,
  `orgID` int(11) NOT NULL,
  `orgTitle` varchar(20) NOT NULL,
  `orgDepartment` varchar(20) NOT NULL,
  `orgJobDescription` text NOT NULL,
  `orgSymbol` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `firstevent` varchar(30) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表格式： `user_homework`
--

CREATE TABLE IF NOT EXISTS `user_homework` (
  `user_homework_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sco_id` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `result` varchar(2) NOT NULL DEFAULT 'U',
  `upload_date` date NOT NULL,
  `filename` varchar(100) NOT NULL,
  `reviewer` int(11) NOT NULL,
  `review_date` date NOT NULL,
  PRIMARY KEY (`user_homework_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_power`
--

CREATE TABLE IF NOT EXISTS `user_power` (
  `user_power_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `power_code` varchar(20) NOT NULL,
  PRIMARY KEY (`user_power_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_profile`
--

CREATE TABLE IF NOT EXISTS `user_profile` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fullName` varchar(10) NOT NULL,
  `user_mps` varchar(6) NOT NULL,
  `name` varchar(40) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `birth_day` int(10) unsigned NOT NULL,
  `birth_month` int(10) unsigned NOT NULL,
  `birth_year` int(10) unsigned NOT NULL,
  `gender` varchar(10) NOT NULL,
  `job_title` varchar(15) NOT NULL,
  `company_id` int(11) NOT NULL,
  `notes` text NOT NULL,
  `city_code` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `url` text NOT NULL,
  `office_phone` varchar(30) NOT NULL,
  `home_phone` varchar(30) NOT NULL,
  `mobile` varchar(30) NOT NULL,
  `image` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=178100 ;

-- --------------------------------------------------------

--
-- 資料表格式： `user_sso`
--

CREATE TABLE IF NOT EXISTS `user_sso` (
  `user_email_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_live_id` varchar(20) NOT NULL,
  `user_fb_id` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`user_email_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=178110 ;
