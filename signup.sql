use eduplay;
show tables;
drop table users;


select * from users;
drop table users;
truncate users;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    father_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(10),
    class VARCHAR(20),
    age INT,
    bio TEXT,
    file VARCHAR(255)
);

