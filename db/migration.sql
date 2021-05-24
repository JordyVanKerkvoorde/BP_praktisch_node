-- Add venues table
create table venues (
	id int not null auto_increment,
	`uuid` char(36) not null,
    `name` varchar(255) not null,
    longitude double,
    latitude double,
    address varchar(255),
    availableSpots int(11),
    createdAt datetime not null,
    updatedAt datetime not null,
    primary key(id)
);

-- Add users table
create table users (
	id int not null auto_increment,
	`uuid` char(36) not null,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    dateOfBirth date not null,
    email varchar(255) not null,
    `password` varchar(255) not null,
    salt varchar(255) not null,
    `role` enum('USER', 'EMPLOYEE', 'OWNER') not null,
    createdAt datetime not null,
    updatedAt datetime not null,
    primary key(id)
);

-- Add reservations table
create table reservations (
	id int not null auto_increment,
	`uuid` char(36) not null,
    spots int(11) not null,
    reservationStart datetime not null,
    reservationEnd datetime not null,
    createdAt datetime not null,
    updatedAt datetime not null,
    venueId int not null,
    userId int not null,
    constraint reservations_ibfk_1 foreign key (venueId) references venues(id) on delete cascade on update cascade,
	constraint reservations_ibfk_2 foreign key (userId) references users(id) on delete cascade on update cascade,
    primary key(id)
);

-- Add owner as fk referencing user
alter table venues
add column ownerId int not null,
add constraint venues_ibfk_1 foreign key (ownerId) references users(id) on delete cascade on update cascade;


