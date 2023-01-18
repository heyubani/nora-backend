/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE order_status AS ENUM('in stock', 'out of stock');


CREATE TABLE IF NOT EXISTS nora_beads (
id VARCHAR PRIMARY KEY DEFAULT 'bead-id-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
category VARCHAR,
name VARCHAR NOT NULL,
color VARCHAR,
status order_status DEFAULT 'in stock',
price NUMERIC(19, 4) DEFAULT 0,
image_url VARCHAR,
quantity INT DEFAULT 0,
description VARCHAR,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS beads_order (
    id VARCHAR PRIMARY KEY DEFAULT 'order-id-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
        name VARCHAR,
        quantity INT,
        total_price  NUMERIC(19, 4) NOT NULL DEFAULT 0,
        is_delivered BOOLEAN,
        cancelled_order BOOLEAN,
        client_address VARCHAR,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO nora_beads
    (category, name, status, price, image_url, quantity, description)
VALUES
    ('Thigh beads', 'honey thigh', 'in stock', 5999, 'https://nora-server-bucket.s3.amazonaws.com/image3%20%2821%29-1658936701858.jpeg', 40, ''),
    ('Thigh beads', 'mamacita', 'in stock', 5299, 'https://nora-server-bucket.s3.amazonaws.com/IMG_9041-1644137551847.jpg', 34, ''),
    ('Thigh beads', 'ebony', 'in stock', 1999, 'https://nora-server-bucket.s3.amazonaws.com/IMG_9049-1644137608314.jpg', 23, ''),
    ('Thigh beads', 'ebony', 'out of stock', 4999, 'https://nora-server-bucket.s3.amazonaws.com/IMG_9049-1644137608314.jpg', 0, ''),
    ('Anglet beads', 'Coral Anklet', 'in stock', 9999, 'https://nora-server-bucket.s3.amazonaws.com/IMG_9049-1644137608314.jpg', 10, ''),
    ('Anglet beads', 'silver with blue gem', 'in stock', 4999, 'https://nora-server-bucket.s3.amazonaws.com/image1%20%2811%29-1651954613687.jpeg', 11, ''),
    ('Waist beads', 'classy queen set', 'in stock', 7599, 'https://nora-server-bucket.s3.amazonaws.com/image2%20%2823%29-1659725427594.jpeg', 90, ''),
    ('Waist beads', 'bright girl set', 'in stock' ,7599, 'https://nora-server-bucket.s3.amazonaws.com/image6%20%287%29-1662379189529.jpeg', 12, '')