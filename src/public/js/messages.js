const socket = io();

const addMessageForm = document.getElementById("addMessageForm");
const messageInput = document.getElementById("message");

addMessageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = prompt("Ingrese su nombre");

        try {
            if (name && messageInput.value) {
                fetch("/api/messages", {
                    method: "POST",
                    body: JSON.stringify({ name, message: messageInput.value }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            reload();
                            alert("Mensaje enviado");
                        }
                    })
                    .catch((data) => {
                        console.error(data.message);
                    });

                document.getElementById("addMessageForm").reset();
    } else {
        alert("Ingrese un nombre y un mensaje antes de enviar.");
    }
} catch (error) {
    console.log(error);
    }
});

async function reload() {
    try {
        const response = await fetch("/api/messages");
        const data = await response.json();

        const msgs = document.getElementById("messages");
        msgs.innerHTML = "";

        data.forEach((msg) => {
            const card = document.createElement("div");
            card.classList.add("cardMessage");
            card.innerHTML = `<div class="infoMessage">
                                <h3>${msg.name}</h3>
                                <p>${msg.message}</p>
                            </div>`;
            msgs.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

socket.emit("messages", (data) => {
    reload(data);
});
