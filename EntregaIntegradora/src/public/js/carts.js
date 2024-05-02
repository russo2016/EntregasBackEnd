const purchaseBtn = document.getElementById('btn-to-purchase');
const deleteBtn = document.getElementById('btn-delete-cart');
const deleteProductFromCart = document.getElementById('delete-product-from-cart');

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

deleteProductFromCart.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = document.getElementById("productId").value
    try {
        const response = await fetch('/api/sessions/current');
        if (!response.ok) {
            throw new Error('No se pudo obtener la sesión del usuario');
        }
        const userData = await response.json();
        if (userData.user) {
            const cart = userData.user.cart;
            const response = await fetch(`/api/carts/${cart}/products/${productId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto del carrito');
            }
            //window.location.reload();
        } else {
            console.error('No se recibió información de usuario válida');
        }
    } catch(error) {
        console.error('Error al obtener la sesión del usuario:', error);
    }
});