create database books;
use books;

create table book(
bookID int not null primary key auto_increment,
title varchar(100),
description varchar(255),
authorName varchar(100),
genre varchar(100));

select*from book;

create table authors(
authorID int not null primary key auto_increment,
authorName varchar(100));

select*from authors;

create table genres(
genreID int not null primary key auto_increment,
genre varchar(100));

select*from genres;