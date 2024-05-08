const logoutLink = document.getElementById('logout');
const addProductButtons = document.querySelectorAll(".addProductToCart")
const btnToCart = document.getElementById('btnToCart');

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

addProductButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const pid = e.target.dataset.productId;
        fetch('/api/sessions/current')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la sesión del usuario');
                }
                return response.json();
            })
            .then(data => {
                if (data.user) {
                    const cart = data.user.cart;
                    fetch(`/api/carts/${cart}/products/${pid}`, {
                        method: 'POST',
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === "success") {
                            Swal.fire({
                                icon: "success",
                                title: "Producto agregado correctamente",
                                showConfirmButton: false,
                                timer: 1000,
                              });
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            console.error(data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error al agregar producto al carrito:', error);
                    });
                } else {
                    console.error('No se recibió información de usuario válida');
                }
            })
            .catch(error => {
                console.error('Error al obtener la sesión del usuario:', error);
            });
    });
});

if (btnToCart) {
    btnToCart.addEventListener('click', function(e) {
        e.preventDefault();
        fetch('/api/sessions/current')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la sesión del usuario');
                }
                return response.json();
            })
            .then(data => {
                if (data.user) {
                    const cart = data.user.cart;
                    window.location.href = `/carts/${cart}`;
                } else {
                    console.error('No se recibió información de usuario válida');
                }
            })
            .catch(error => {
                console.error('Error al obtener la sesión del usuario:', error);
            });
    });
}