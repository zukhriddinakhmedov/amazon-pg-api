import pool from "../utils/db.js"
const query = `
-- DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS
products(
product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (50) NOT NULL,
description VARCHAR (200) NOT NULL,
brand VARCHAR (50) NOT NULL,
image_url TEXT NOT NULL,
price FLOAT NOT NULL,
category VARCHAR NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW()
)

--DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS 
reviews(
    review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment VARCHAR NOT NULL,
    rate INTEGER REQUIRED,
    product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    created_at TIMESTAMTZ DEFAULT NOW()
);
`

const createTables = async () => {
    try {
        await pool.query(query)
        console.log('Default tables are created')
    } catch (error) {
        console.log(error)
        console.log('Default tables are not created')
    }
}

export default createTables
