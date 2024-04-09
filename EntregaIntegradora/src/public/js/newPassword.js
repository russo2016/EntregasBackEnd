const form = document.getElementById("newPasswordForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    fetch("/forgotPassword/:email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                console.log("Ok", data);
            } else {
                console.log("Error", data);
            }
        });
});