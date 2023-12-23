const socket = io();

const addProductBtn = document.getElementById("addProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");

addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const price = document.getElementById("price");
    const thumbnail = document.getElementById("thumbnail");
    const code = document.getElementById("code");
    const stock = document.getElementById("stock");

    const product = {
        title : title.value,
        description : description.value,
        price : price.value,
        thumbnail : thumbnail.value,
        code : code.value,
        stock : stock.value,
    };
    socket.emit("addProduct", product);
    title.value = "";
    description.value = "";
    price.value = "";
    thumbnail.value = "";
    code.value = "";
    stock.value = "";
});

deleteProductBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = document.getElementById("productId");
    socket.emit("deleteProduct", productId.value);
    productId.value = "";
    alert("producto eliminado");
  });

socket.on("updateProducts", (products) => {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        productsContainer.innerHTML += `<tr>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.thumbnail}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        </tr>`;
    });
});

socket.on("error", (error) => {
    console.log("El producto no existe")
});