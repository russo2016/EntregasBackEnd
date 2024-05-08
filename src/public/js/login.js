async function postLogin(email, password){
    try{
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    const result = await response.json();
    if(result.success){
        window.location.href = '/products';
    }else{
        alert("Usuario o contraseña incorrectos");
    }
    return result;
}catch(error){
    console.log(error);
}
}

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    postLogin(email, password);
    }catch(error){
        console.log(error);
    }
});