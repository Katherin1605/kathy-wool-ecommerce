import request from "supertest";
import app from "../server.js";

describe("Products API", () => {

    test("Obtener productos debe retornar 200 y un array", async () => {
        const res = await request(app)
            .get("/products");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Obtener producto inexistente debe retornar 404", async () => {
        const res = await request(app)
            .get("/products/99999");

        expect(res.statusCode).toBe(404);
    });

    test("Obtener categorías debe retornar 200", async () => {
        const res = await request(app)
            .get("/categories");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});