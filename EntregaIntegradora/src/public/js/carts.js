const purchaseBtn = document.getElementById('btn-to-purchase');
const deleteBtn = document.getElementById('btn-delete-cart');
const deleteProductBtns = document.querySelectorAll('.deleteProductFromCart');

purchaseBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/sessions/current');
        if (!response.ok) {
            throw new Error('No se pudo obtener la sesión del usuario');
        }
        const userData = await response.json();
        if (userData.user) {
            const cart = userData.user.cart;
            window.location.href = `/carts/${cart}/purchase`;
        } else {
            console.error('No se recibió información de usuario válida');
        }
    } catch(error) {
        console.error('Error al obtener la sesión del usuario:', error);
    }
});

deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/sessions/current');
        if (!response.ok) {
            throw new Error('No se pudo obtener la sesión del usuario');
        }
        const userData = await response.json();
        if (userData.user) {
            const cart = userData.user.cart;
            const response = await fetch(`/api/carts/${cart}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('No se pudo eliminar el carrito');
            }
            window.location.reload();
        } else {
            console.error('No se recibió información de usuario válida');
        }
    } catch(error) {
        console.error('Error al obtener la sesión del usuario:', error);
    }
});

deleteProductBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const pid = e.target.dataset.productId;
        try {
            const response = await fetch('/api/sessions/current');
            if (!response.ok) {
                throw new Error('No se pudo obtener la sesión del usuario');
            }
            const userData = await response.json();
            if (userData.user) {
                const cart = userData.user.cart;
                const response = await fetch(`/api/carts/${cart}/products/${pid}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('No se pudo eliminar el producto del carrito');
                }
                window.location.reload();
            } else {
                console.error('No se recibió información de usuario válida');
            }
        } catch(error) {
            console.error('Error al obtener la sesión del usuario:', error);
        }
    });
});