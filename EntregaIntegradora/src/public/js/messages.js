const socket = io();

const addMessageForm = document.getElementById("addMessageForm");
const messageInput = document.getElementById("message");

addMessageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = prompt("Ingrese su nombre");

    if (name && messageInput.value) {
        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                body: JSON.stringify({ name, message: messageInput.value }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    reload(data.message);
                    alert("Mensaje enviado");
                } else {
                    alert("Error al enviar el mensaje");
                }
            } else {
                alert("Error en la solicitud");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error en la solicitud");
        }

        document.getElementById("addMessageForm").reset();
    } else {
        alert("Ingrese un nombre y un mensaje antes de enviar.");
    }
});

function reload(messages) {
    const msgs = document.getElementById("messages");
    msgs.innerHTML = "";

    messages.forEach((msg) => {
        const card = document.createElement("div");
        card.classList.add("msgs");
        card.innerHTML = `<div class="infoMessage">
                            <h3>${msg.name}</h3>
                            <p>${msg.message}</p>
                        </div>`;
        msgs.appendChild(card);
    });
}

socket.emit("messages", (data) => {
    reload(data);
});
