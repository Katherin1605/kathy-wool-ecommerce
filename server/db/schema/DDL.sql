CREATE DATABASE kathy_wool;

CREATE TYPE user_role AS ENUM ('admin', 'client');
CREATE TYPE product_material AS ENUM ('lana de alpaca', 'algodon organico', 'lana natural', 'lana sintetica');
CREATE TYPE product_cares AS ENUM ('lavado a mano con agua fria', 'lavado en seco', 'No centrifugar', 'lavado con agua tibia');


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    isActive BOOLEAN DEFAULT TRUE
);


CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    description TEXT,
    price INT NOT NULL,
    stock INT DEFAULT 0,
    url_image VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    isActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    date DATE DEFAULT CURRENT_DATE,
    total INT NOT NULL
);


CREATE TABLE reviews (
    reviews_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    stars INT CHECK (stars >= 1 AND stars <= 5)
);

CREATE TABLE cartDetails (
    cartDetail_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(cart_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    amount INT NOT NULL
);

CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    isActive BOOLEAN DEFAULT TRUE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orderDetails (
    orderDetail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE SET NULL,
    amount INT NOT NULL,
    currentPrice INT NOT NULL
);

CREATE TABLE specifications (
    specification_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    material product_material,
    cares product_cares,
    handMade BOOLEAN DEFAULT TRUE
);