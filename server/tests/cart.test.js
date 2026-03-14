import request from "supertest";
import app from "../server.js";

describe("Cart API", () => {

    test("GET /api/cart/:userId should return cart items", async () => {

        const response = await request(app).get("/api/cart/1");

        expect(response.statusCode).toBe(200);

    });

    test("POST /api/cart/add should add product to cart", async () => {

        const response = await request(app)
        .post("/api/cart/add")
        .send({
            userId: 1,
            productId: 1
        });

        expect(response.statusCode).toBe(200);

    });

    test("PUT /api/cart/update should update quantity", async () => {

        const response = await request(app)
        .put("/api/cart/update")
        .send({
            userId: 1,
            productId: 1,
            amount: 2
        });

        expect(response.statusCode).toBe(200);

    });

    test("DELETE /api/cart/remove should remove item", async () => {

        const response = await request(app)
        .delete("/api/cart/remove")
        .send({
            userId: 1,
            productId: 1
        });

        expect(response.statusCode).toBe(200);

    });

});