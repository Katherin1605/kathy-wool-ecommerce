import request from "supertest";
import app from "../server.js";

describe("Cart API", () => {

    test("Debe obtener el carrito de un usuario", async () => {

        const res = await request(app)
        .get("/api/cart/1");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

    });

    test("Debe agregar el producto al carrito", async () => {

        const res = await request(app)
        .post("/api/cart/add")
        .send({
            userId: 1,
            productId: 2
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Producto agregado al carrito");

    });

    test("Debe actualizar cantidad dentro del carrito", async () => {

        const res = await request(app)
        .put("/api/cart/update")
        .send({
            userId: 1,
            productId: 2,
            amount: 3
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Cantidad actualizada exitosamente");

    });

    test("Debe eliminar el producto del carrito", async () => {

        const res = await request(app)
        .delete("/api/cart/remove")
        .send({
            userId: 1,
            productId: 2
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Producto eliminado correctamente");

    });

});