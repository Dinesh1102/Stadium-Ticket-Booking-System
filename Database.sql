create database stadium_ticket_booking;

use stadium_ticket_booking;

create table users(
   id int auto_increment,
   full_name varchar(50),
   email_id varchar(50),
   password varchar(50),
   primary key(id)
);

create table game(
  game_id int,
  game_title varchar(100),
  date_of_game varchar(50),
  primary key(game_id)
);
insert into game
values (101,'BRAZIL VS BELGIUM','2022-11-21 18:00:00'),(102,'ITALY VS ENGLAND','2022-12-15 19:30:00'),
(103,'PORTUGAL VS SPAIN','2023-01-03 20:00:00'),(104,'FRANCE VS ARGENTINA','2023-01-29 21:30:00');

create table class(
  class_name varchar(20),
  price int,
  no_of_available_seats int,
  game_id int,
  primary key(class_name,game_id),
  foreign key(game_id) references game(game_id) on delete cascade
);
insert into class
values ('Rapt Premium',100,49,101),('Rapt Premium',100,49,102),('Rapt Premium',100,49,103),('Rapt Premium',100,49,104),
('Flag Premium',80,28,101),('Flag Premium',80,28,102),('Flag Premium',80,28,103),('Flag Premium',80,28,104),
('Middle-EastWest',60,34,101),('Middle-EastWest',60,34,102),('Middle-EastWest',60,34,103),('Middle-EastWest',60,34,104),
('Middle-NorthSouth',40,72,101),('Middle-NorthSouth',40,72,102),('Middle-NorthSouth',40,72,103),('Middle-NorthSouth',40,72,104),
('End-EastWest',20,20,101),('End-EastWest',20,20,102),('End-EastWest',20,20,103),('End-EastWest',20,20,104),
('End-NorthSouth',10,46,101),('End-NorthSouth',10,46,102),('End-NorthSouth',10,46,103),('End-NorthSouth',10,46,104);

create table seat(
seat_id int auto_increment,
seat_no int,
section varchar(30),
primary key(seat_id)
);
insert into seat(seat_no,section)
values(105,'Rapt Premium'),(103,'Rapt Premium'),(101,'Rapt Premium'),(102,'Rapt Premium'),(104,'Rapt Premium'),(106,'Rapt Premium'),
(129,'Rapt Premium'),(131,'Rapt Premium'),(133,'Rapt Premium'),(134,'Rapt Premium'),(132,'Rapt Premium'),(130,'Rapt Premium'),
(205,'Rapt Premium'),(203,'Rapt Premium'),(201,'Rapt Premium'),(200,'Rapt Premium'),(202,'Rapt Premium'),(204,'Rapt Premium'),
(206,'Rapt Premium'),(229,'Rapt Premium'),(231,'Rapt Premium'),(233,'Rapt Premium'),(234,'Rapt Premium'),(232,'Rapt Premium'),
(230,'Rapt Premium'),(305,'Rapt Premium'),(303,'Rapt Premium'),(301,'Rapt Premium'),(302,'Rapt Premium'),(304,'Rapt Premium'),
(306,'Rapt Premium'),(331,'Rapt Premium'),(333,'Rapt Premium'),(335,'Rapt Premium'),(336,'Rapt Premium'),(334,'Rapt Premium'),
(332,'Rapt Premium'),(405,'Rapt Premium'),(403,'Rapt Premium'),(401,'Rapt Premium'),(402,'Rapt Premium'),(404,'Rapt Premium'),
(406,'Rapt Premium'),(439,'Rapt Premium'),(441,'Rapt Premium'),(443,'Rapt Premium'),(444,'Rapt Premium'),(442,'Rapt Premium'),
(440,'Rapt Premium'),(107,'Flag Premium'),(108,'Flag Premium'),(127,'Flag Premium'),(128,'Flag Premium'),(207,'Flag Premium'),
(208,'Flag Premium'),(227,'Flag Premium'),(228,'Flag Premium'),(309,'Flag Premium'),(307,'Flag Premium'),(308,'Flag Premium'),
(310,'Flag Premium'),(325,'Flag Premium'),(327,'Flag Premium'),(329,'Flag Premium'),(330,'Flag Premium'),(328,'Flag Premium'),
(326,'Flag Premium'),(409,'Flag Premium'),(407,'Flag Premium'),(408,'Flag Premium'),(410,'Flag Premium'),(433,'Flag Premium'),
(435,'Flag Premium'),(437,'Flag Premium'),(438,'Flag Premium'),(436,'Flag Premium'),(434,'Flag Premium'),
(109,'Middle-NorthSouth'),(111,'Middle-NorthSouth'),(113,'Middle-NorthSouth'),(115,'Middle-NorthSouth'),(117,'Middle-NorthSouth'),
(119,'Middle-NorthSouth'),(121,'Middle-NorthSouth'),(123,'Middle-NorthSouth'),(125,'Middle-NorthSouth'),(110,'Middle-NorthSouth'),
(112,'Middle-NorthSouth'),(114,'Middle-NorthSouth'),(116,'Middle-NorthSouth'),(118,'Middle-NorthSouth'),(120,'Middle-NorthSouth'),
(122,'Middle-NorthSouth'),(124,'Middle-NorthSouth'),(126,'Middle-NorthSouth'),(209,'Middle-NorthSouth'),(211,'Middle-NorthSouth'),
(213,'Middle-NorthSouth'),(215,'Middle-NorthSouth'),(217,'Middle-NorthSouth'),(219,'Middle-NorthSouth'),(221,'Middle-NorthSouth'),
(223,'Middle-NorthSouth'),(225,'Middle-NorthSouth'),(210,'Middle-NorthSouth'),(212,'Middle-NorthSouth'),(214,'Middle-NorthSouth'),
(216,'Middle-NorthSouth'),(218,'Middle-NorthSouth'),(220,'Middle-NorthSouth'),(222,'Middle-NorthSouth'),(224,'Middle-NorthSouth'),
(226,'Middle-NorthSouth'),(311,'Middle-NorthSouth'),(313,'Middle-NorthSouth'),(315,'Middle-NorthSouth'),(317,'Middle-NorthSouth'),
(319,'Middle-NorthSouth'),(321,'Middle-NorthSouth'),(323,'Middle-NorthSouth'),(312,'Middle-NorthSouth'),(314,'Middle-NorthSouth'),
(316,'Middle-NorthSouth'),(318,'Middle-NorthSouth'),(320,'Middle-NorthSouth'),(322,'Middle-NorthSouth'),(324,'Middle-NorthSouth'),
(411,'Middle-NorthSouth'),(413,'Middle-NorthSouth'),(415,'Middle-NorthSouth'),(417,'Middle-NorthSouth'),(419,'Middle-NorthSouth'),
(421,'Middle-NorthSouth'),(423,'Middle-NorthSouth'),(425,'Middle-NorthSouth'),(427,'Middle-NorthSouth'),(429,'Middle-NorthSouth'),
(431,'Middle-NorthSouth'),(412,'Middle-NorthSouth'),(414,'Middle-NorthSouth'),(416,'Middle-NorthSouth'),(418,'Middle-NorthSouth'),
(420,'Middle-NorthSouth'),(422,'Middle-NorthSouth'),(424,'Middle-NorthSouth'),(426,'Middle-NorthSouth'),(428,'Middle-NorthSouth'),
(430,'Middle-NorthSouth'),(432,'Middle-NorthSouth'),
(511,'Middle-EastWest'),(509,'Middle-EastWest'),(507,'Middle-EastWest'),(505,'Middle-EastWest'),(503,'Middle-EastWest'),(501,'Middle-EastWest'),
(502,'Middle-EastWest'),(504,'Middle-EastWest'),(506,'Middle-EastWest'),(508,'Middle-EastWest'),(510,'Middle-EastWest'),(512,'Middle-EastWest'),
(535,'Middle-EastWest'),(537,'Middle-EastWest'),(539,'Middle-EastWest'),(541,'Middle-EastWest'),(543,'Middle-EastWest'),(544,'Middle-EastWest'),
(542,'Middle-EastWest'),(540,'Middle-EastWest'),(538,'Middle-EastWest'),(536,'Middle-EastWest'),(635,'Middle-EastWest'),(637,'Middle-EastWest'),
(639,'Middle-EastWest'),(641,'Middle-EastWest'),(643,'Middle-EastWest'),(645,'Middle-EastWest'),(646,'Middle-EastWest'),(644,'Middle-EastWest'),
(642,'Middle-EastWest'),(640,'Middle-EastWest'),(638,'Middle-EastWest'),(636,'Middle-EastWest'),
(513,'End-NorthSouth'),(515,'End-NorthSouth'),(517,'End-NorthSouth'),(519,'End-NorthSouth'),(521,'End-NorthSouth'),
(523,'End-NorthSouth'),(525,'End-NorthSouth'),(527,'End-NorthSouth'),(529,'End-NorthSouth'),(531,'End-NorthSouth'),
(533,'End-NorthSouth'),(514,'End-NorthSouth'),(516,'End-NorthSouth'),(518,'End-NorthSouth'),(520,'End-NorthSouth'),
(522,'End-NorthSouth'),(524,'End-NorthSouth'),(526,'End-NorthSouth'),(528,'End-NorthSouth'),(530,'End-NorthSouth'),
(532,'End-NorthSouth'),(534,'End-NorthSouth'),(611,'End-NorthSouth'),(613,'End-NorthSouth'),(615,'End-NorthSouth'),
(617,'End-NorthSouth'),(619,'End-NorthSouth'),(621,'End-NorthSouth'),(623,'End-NorthSouth'),(625,'End-NorthSouth'),
(627,'End-NorthSouth'),(629,'End-NorthSouth'),(631,'End-NorthSouth'),(633,'End-NorthSouth'),(612,'End-NorthSouth'),
(614,'End-NorthSouth'),(616,'End-NorthSouth'),(618,'End-NorthSouth'),(620,'End-NorthSouth'),(622,'End-NorthSouth'),
(624,'End-NorthSouth'),(626,'End-NorthSouth'),(628,'End-NorthSouth'),(630,'End-NorthSouth'),(632,'End-NorthSouth'),
(634,'End-NorthSouth'),
(609,'End-EastWest'),(607,'End-EastWest'),(605,'End-EastWest'),(603,'End-EastWest'),(601,'End-EastWest'),(602,'End-EastWest'),
(604,'End-EastWest'),(606,'End-EastWest'),(608,'End-EastWest'),(610,'End-EastWest'),(701,'End-EastWest'),(703,'End-EastWest'),
(705,'End-EastWest'),(707,'End-EastWest'),(709,'End-EastWest'),(710,'End-EastWest'),(708,'End-EastWest'),(706,'End-EastWest'),
(704,'End-EastWest'),(702,'End-EastWest');

create table ticket(
   ticket_id int,
   seat_id int,
   game_id int,
   user_id int,
   primary key(ticket_id),
   foreign key(user_id) references users(id) on delete cascade,
   foreign key(game_id) references game(game_id) on delete cascade,
   foreign key(seat_id) references seat(seat_id) on delete cascade
);

create table stadium(
   stadium_name varchar(100),
   city varchar(50),
   game_id int,
   foreign key(game_id) references game(game_id) on delete cascade
);
insert into stadium 
values('Phoenix Stadium','Wakanda',101),('Phoenix Stadium','Wakanda',102),('Phoenix Stadium','Wakanda',103),('Phoenix Stadium','Wakanda',104);

create table employee(
  employee_id int auto_increment,
  employee_name varchar(50),
  mobile_no bigint,
  department varchar(30),
  primary key(employee_id)
);
insert into employee(employee_name,mobile_no,department)
values('Robert Downey',9724627627,'Admin'),('Mark Ruffalo',7136137186,'Admin'),('Tom Holland',8326245362,'HR'),
('Benedict Cumberbatch',9372862735,'Facility Manager'),('Chris Evans',8732672365,'Event Manager');

create table cancelled(
   user_id int,
   ticket_id int,
   game_title varchar(100),
   cancelled_date varchar(50),
   primary key(ticket_id),
   foreign key(user_id) references users(id) on delete cascade
);

create table booked(
    ticket_id int,
    user_id int,
    game_title varchar(50),
    game_date varchar(50),
    seat_no int,
    primary key(ticket_id),
	foreign key(user_id) references users(id) on delete cascade,
	foreign key(ticket_id) references ticket(ticket_id) on delete cascade
);

create table admin(
   email_id varchar(50),
   password varchar(50),
   primary key(email_id)
);
insert into admin values('dinesh@gmail.com','dinesh@1102');
