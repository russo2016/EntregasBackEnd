const logoutLink = document.getElementById('logout');

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
