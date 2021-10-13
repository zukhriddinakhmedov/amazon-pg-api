import { Router } from "express"
import pool from "../../utils/db.js"

const route = Router()

route.get("/", async (req, res, next) => {
    try {
        const query =
            `SELECT 
    review.review_id,
    review.comment AS review_comment,
    review.rate
    product.name AS product_name,
    product.description,
    product.brand,
    product.image_url,
    product.price,
    product.category
    FROM reviews as review
    INNER JOIN products AS product ON review.product = product.product_id
    `
        const result = await pool.query(query)
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
route.post("/", async (req, res, next) => {
    try {
        const { comment, rate } = req.body
        const query = `
        INSERT INTO reviews
        (
            comment,
            rate
        )
        VALUES
        (
            ${"'" + comment + "'"},
            ${"'" + rate + "'"}
        )RETURNING *;
        `
        const result = await pool.query(query)
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
route.delete("/:id", async (req, res, next) => {
    try {
        const query = `DELETE FROM reviews WHERE review_id=${req.params.id}`
        await pool.query(query)
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
route.put("/:id", async (req, res, next) => {
    try {
        const { comment, rate } = req.body
        const query = `
        UPDATE reviews
        SET
          comment=${"'" + comment + "'"},
          rate=${"'" + rate + "'"}
        WHERE product_id=${req.params.id}
        RETURNING *;
        `
        const result = await pool.query(query)
        res.send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export default route