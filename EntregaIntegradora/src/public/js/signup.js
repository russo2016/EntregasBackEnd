async function postSignup({first_name, last_name, email, age, password}){
    const data = {first_name, last_name, email, age, password};
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const result = await postSignup({first_name, last_name, email, age, password});
    if(result.success){
        window.location.href = '/login';
    }else{
        alert("error");
        console.log(result);
    }
});