CREATE TABLE products(
    id INT ,
    name VARCHAR(225) NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    id_category INT NOT NULL,
    id_locRak INT NOT NULL,
    created_on 		timestamp default CURRENT_TIMESTAMP not null	,
    updated_on 		timestamp default CURRENT_TIMESTAMP not null	,
    primary key (id)
);



CREATE TABLE transaction(
    id INT ,
    id_product INT NOT NULL,
    qty  INT NOT NULL,
    price INT NOT NULL,
    created_on 		timestamp default CURRENT_TIMESTAMP not null	,
    updated_on 		timestamp default CURRENT_TIMESTAMP not null	,
    primary key (id)
);


CREATE TABLE raks(
    id INT ,
    name_rak            VARCHAR(225) NOT NULL,
    location            VARCHAR(225) NOT NULL,
    capacity            INT NOT NULL,
    id_category         INT NOT NULL,
    created_on 		timestamp default CURRENT_TIMESTAMP not null,
    updated_on 		timestamp default CURRENT_TIMESTAMP not null,
    primary key (id)
);


CREATE TABLE categorys(
    id INT ,
    name_category VARCHAR(225) NOT NULL,
    created_on 		timestamp default CURRENT_TIMESTAMP not null	,
    updated_on 		timestamp default CURRENT_TIMESTAMP not null	,
    primary key (id)
);