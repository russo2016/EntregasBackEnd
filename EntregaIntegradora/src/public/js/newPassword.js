const form = document.getElementById("newPasswordForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("newPassword").value;
    const email = window.location.pathname.split("/")[2];
    fetch(`/forgotPassword/${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log("Ok", data);
            } else {
                alert(data.message)
            }
        });
});