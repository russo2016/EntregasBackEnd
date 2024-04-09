const form = document.getElementById("forgotPasswordForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar el envío predeterminado del formulario
    const email = document.getElementById("email").value;
    const response = await fetch("/forgotPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data) {
        console.log("Ok", data)
    } else {
        console.log("Error", data)
    }
});
