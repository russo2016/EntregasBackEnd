export const generateCartErrorInfo = (cart) =>{
    return `Uno o más productos no se pudieron agregar al carrito: ${cart}`
}

export const generateNotFoundRouteErrorInfo = () =>{
    return `Pagina no encontrada`
}

export const generateProductErrorInfo =(product) =>{
    return `El producto no existe * Uno o más campos son inválidos. Los campos son: title: ${product.title}, price: ${product.price}, thumbnail: ${product.thumbnail}, stock: ${product.stock}, description: ${product.description}, code: ${product.code}`;
}

