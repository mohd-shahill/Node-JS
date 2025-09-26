There are 2 tables in the http (database name) postgres as of now.

1. create table orders (
    order_id varchar(20) primary key, not null,
    order_name varchar(20),
    order_started bigint
);

2. create table uploads(
    id serial primary key,
    path varchar(100)
);