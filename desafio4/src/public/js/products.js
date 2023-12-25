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
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        productsContainer.innerHTML += `
        <div class="cardProduct">
            <div class="imageProduct">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="infoProduct">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <p>${product.code}</p>
                <p>${product.stock}</p>
                <span>${product.id}</span>
            </div>
        </div>`;
    });
});

socket.on("error", (error) => {
    console.log("El producto no existe")
});