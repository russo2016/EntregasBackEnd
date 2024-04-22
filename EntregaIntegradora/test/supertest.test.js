import supertest from 'supertest';
import * as chai from 'chai';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

let temporalId = 0;
let temporalCartId = 0;

describe("Testing ecommerce", () => {
    describe("Testing products", ()=>{
        it("El endpoint POST /api/products debe crear un producto", async () => {
            const product = {
                title: 'Producto 1',
                description: 'Descripcion del producto 1',
                code: '1234',
                price: 1000,
                stock: 10,
                thumbnail: 'url',
            }
            const result = await requester.post('/api/products').send(product);
            expect(result.ok).to.be.true;

            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            const id = result._body._id;
            temporalId = id;
            console.log("**********RESULTADO*************")
        })
        it("El endpoint GET /api/products debe devolver todos los productos", async () => {
            const result = await requester.get('/api/products');
            expect(result.ok).to.be.true;
            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            console.log("**********RESULTADO*************")
        })
        it("El endpoint GET /api/products/:id debe devolver un producto", async () => {
            const result = await requester.get(`/api/products/${temporalId}`);
            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            console.log("**********RESULTADO*************")
        }
    )
})
    describe("Testing sessions", ()=>{
        it("El endpoint POST /api/sessions debe crear una sesión", async () => {
            const user = {
                first_name: "Usuario",
                last_name: "Test",
                email: "usuario@gmail.com",
                password: "1234",
                age: 30,
                role: "user"
            }
            const result = await requester.post('/api/sessions/signup').send(user);
            expect(result.ok).to.be.true;
            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            const CartId = result._body.user.cart;
            temporalCartId = CartId;
            console.log("**********RESULTADO*************")
        })
        it("El endpoint POST /api/sessions/login debe loguear un usuario", async () => {
            const user = {
                first_name: "Usuario",
                last_name: "Test",
                email: "usuario@gmail.com",
                password: "1234",
                age: 30,
                role: "user"
            }
            const result = await requester.post('/api/sessions/login').send(user);
            expect(result.ok).to.be.true;
            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            console.log("**********RESULTADO*************")
        })
        it("El endpoint POST api/session/logout debe cerrar la sesión", async () => {
            const result = await requester.post('/api/sessions/logout');
            expect(result.ok).to.be.true;
            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            console.log("**********RESULTADO*************")
        })
    })
    describe("Testing carts", ()=>{
        it("El endpoint GET /api/cart/:id debe traer un carrito", async () => {
            const result = await requester.get(`/api/carts/${temporalCartId}`);
            expect(result.ok).to.be.true;
            console.log("**********RESULTADO*************")
            console.log(result._body)
            console.log(result.statusCode)
            console.log(result.ok)
            console.log("**********RESULTADO*************")
    })
    it("El endpoint POST /api/cart/:id debe agregar un producto al carrito", async () => {
        const result = await requester.post(`/api/carts/${temporalCartId}/products/${temporalId}`);
        expect(result.ok).to.be.true;
        console.log("**********RESULTADO*************")
        console.log(result._body)
        console.log(result.statusCode)
        console.log(result.ok)
        console.log("**********RESULTADO*************")
    })
    it("El endpoint DELETE /api/cart/:id debe eliminar un producto del carrito", async () => {
        const result = await requester.delete(`/api/carts/${temporalCartId}/products/${temporalId}`);
        expect(result.ok).to.be.true;
        console.log("**********RESULTADO*************")
        console.log(result._body)
        console.log(result.statusCode)
        console.log(result.ok)
        console.log("**********RESULTADO*************")
    })
})
})