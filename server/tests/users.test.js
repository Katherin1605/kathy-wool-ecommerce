import request from "supertest";
import app from "../server.js";

describe("Users API - Rutas protegidas", () => {

    test("Acceder a perfil sin token debe retornar 400", async () => {
        const res = await request(app)
            .get("/users/me");

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("El token debe estar presente");
    });

    test("Acceder a perfil con token inválido debe retornar 400", async () => {
        const res = await request(app)
            .get("/users/me")
            .set("Authorization", "Bearer tokenfalso123");

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("el token es invalido");
    });

    test("Acceder a favoritos sin token debe retornar 400", async () => {
        const res = await request(app)
            .get("/users/me/favorites");

        expect(res.statusCode).toBe(400);
    });

    test("Acceder a órdenes sin token debe retornar 400", async () => {
        const res = await request(app)
            .get("/users/me/orders");

        expect(res.statusCode).toBe(400);
    });

});