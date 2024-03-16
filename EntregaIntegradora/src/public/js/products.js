const logoutLink = document.getElementById('logout');
const addProductToCartbtn = document.getElementById("addProductToCart");

if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();

        fetch('/logout', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            window.location.href = '/login';
            alert('Sesión cerrada con éxito');
            } else {
            console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error);
            });
    });
}

if (addProductToCartbtn) {
    addProductToCartbtn.addEventListener('click', function(e) {
        e.preventDefault();
        try {
            const productId = document.getElementById("productID").textContent.trim()
            const id = document.getElementById("cartID").textContent.trim();
            fetch(`/api/carts/${id}/products/${productId}`, {
                method: "POST",
            })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    alert("Producto agregado al carrito");
                }
            })
        } catch (error) {
            console.log(error);
        }
    });
}