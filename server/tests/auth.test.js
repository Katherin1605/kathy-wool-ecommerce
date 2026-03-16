import request from "supertest";
import app from "../server.js";

describe("Auth API", () => {

    test("Login con credenciales correctas debe retornar 200 y token", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "a@test.com", password: "123456" });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
    });

    test("Login con usuario inexistente debe retornar 404", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "noexiste@fake.com", password: "123456" });

        expect(res.statusCode).toBe(404);
    });

    test("Login con contraseña incorrecta debe retornar 401", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "a@test.com", password: "wrongpassword" });

        expect(res.statusCode).toBe(401);
    });

});