const saveProduct = document.getElementById("saveProduct");
const deleteProduct = document.getElementById("deleteProduct");
const updateProduct = document.getElementById("updateProduct");

saveProduct.addEventListener("click", (e) => {
    e.preventDefault();
    try{
	const title = document.getElementById("title");
	const description = document.getElementById("description");
	const price = document.getElementById("price");
	const thumbnail = document.getElementById("thumbnail");
	const code = document.getElementById("code");
	const stock = document.getElementById("stock");

	const product = {
		title: title.value,
		description: description.value,
		price: price.value,
		thumbnail: thumbnail.value,
		code: code.value,
		stock: stock.value,
	};
    
    fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert("Producto creado");
        }
    })
    .catch((data) => {
        console.error(data.message);
    });

	title.value = "";
	description.value = "";
	price.value = "";
	thumbnail.value = "";
	code.value = "";
	stock.value = "";
    } catch (error) {
        console.log(error);
    }
});

deleteProduct.addEventListener("click", (e) => {
    e.preventDefault();
    try{
        const id = document.getElementById("productId").value
        fetch(`/api/products/${id}`, {
        method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Producto eliminado");
            }
        })
    } catch (error) {
    console.log(error);
}
});

updateProduct.addEventListener("click", (e) => {
    e.preventDefault();
    try {
        const title = document.getElementById("titlePut");
        const description = document.getElementById("descriptionPut");
        const price = document.getElementById("pricePut");
        const thumbnail = document.getElementById("thumbnailPut");
        const id= document.getElementById("idPut");
        const stock = document.getElementById("stockPut");
        const code = document.getElementById("codePut");

        const product = {
            title : title.value,
            description : description.value,
            price : price.value,
            thumbnail : thumbnail.value,
            code : code.value,
            stock : stock.value
        };
        fetch(`/api/products/${id.value}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Producto actualizado");
            }
        })
    } catch (error) {
        console.log(error);
    }
});