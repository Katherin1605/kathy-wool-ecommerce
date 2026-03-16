import request from "supertest";
import app from "../server.js";

describe("Checkout API", () => {

    test("POST /api/checkout should process order", async () => {

        const response = await request(app)
        .post("/api/checkout")
        .send({
            userId: 1,
            items: [
                { id: 1, price: 1000, quantity: 2 }
            ]
        })

        expect(response.statusCode).toBe(200);

    });

});