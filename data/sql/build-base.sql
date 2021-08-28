CREATE DATABASE crud;

USE crud;

CREATE TABLE User(
	id int not null auto_increment,
	name varchar(100),
    gender varchar(6),
    age int,
    login varchar(100),
    password varchar(100),
    primary key(id));
    
CREATE TABLE Conta(
	id int not null auto_increment,
    balance decimal,
    id_User int,
    primary key(id),
    foreign key(id_User) references User(id));