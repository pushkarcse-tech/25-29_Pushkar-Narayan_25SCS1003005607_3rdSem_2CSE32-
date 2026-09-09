// =========================
// SOCKET.IO
// =========================

let socket = null;


// =========================
// USER DATA
// =========================

let currentUser = null;

const room = "general";

const API_URL = "http://localhost:5002";


// =========================
// HTML ELEMENTS
// =========================

const authScreen =
    document.getElementById("auth-screen");

const chatScreen =
    document.getElementById("chat-screen");

const loginForm =
    document.getElementById("login-form");

const registerForm =
    document.getElementById("register-form");

const loginBtn =
    document.getElementById("login-btn");

const registerBtn =
    document.getElementById("register-btn");

const showRegister =
    document.getElementById("show-register");

const showLogin =
    document.getElementById("show-login");

const logoutBtn =
    document.getElementById("logout-btn");

const currentUserElement =
    document.getElementById("current-user");

const messages =
    document.getElementById("messages");

const messageForm =
    document.getElementById("message-form");

const messageInput =
    document.getElementById("message-input");


// =========================
// SWITCH TO REGISTER
// =========================

showRegister.addEventListener("click", () => {

    loginForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

});


// =========================
// SWITCH TO LOGIN
// =========================

showLogin.addEventListener("click", () => {

    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

});


// =========================
// REGISTER
// =========================

registerBtn.addEventListener("click", async () => {

    const username =
        document.getElementById("register-username").value.trim();

    const email =
        document.getElementById("register-email").value.trim();

    const password =
        document.getElementById("register-password").value;


    const message =
        document.getElementById("register-message");


    if (!username || !email || !password) {

        message.textContent =
            "Please fill in all fields.";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            message.textContent =
                data.message || "Registration failed.";

            return;
        }


        message.textContent =
            "Registration successful! Please login.";


        document.getElementById(
            "register-username"
        ).value = "";

        document.getElementById(
            "register-email"
        ).value = "";

        document.getElementById(
            "register-password"
        ).value = "";


        setTimeout(() => {

            registerForm.classList.add("hidden");

            loginForm.classList.remove("hidden");

        }, 1000);


    } catch (error) {

        message.textContent =
            "Unable to connect to server.";

        console.error(error);

    }

});


// =========================
// LOGIN
// =========================

loginBtn.addEventListener("click", async () => {

    const email =
        document.getElementById("login-email").value.trim();

    const password =
        document.getElementById("login-password").value;


    const message =
        document.getElementById("login-message");


    if (!email || !password) {

        message.textContent =
            "Please enter email and password.";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            message.textContent =
                data.message || "Login failed.";

            return;
        }


        currentUser = data.user;


        startChat();


    } catch (error) {

        message.textContent =
            "Unable to connect to server.";

        console.error(error);

    }

});


// =========================
// START CHAT
// =========================

function startChat() {

    authScreen.classList.add("hidden");

    chatScreen.classList.remove("hidden");


    currentUserElement.textContent =
        currentUser.username;


    messages.innerHTML = "";


    // Create Socket.IO connection

    socket = io(API_URL);


    // Join general room

    socket.emit("join-room", room);


    // Load previous messages

    socket.on("message-history", (messageHistory) => {

        messages.innerHTML = "";

        messageHistory.forEach((data) => {

            displayMessage(data);

        });

    });


    // Receive new messages

    socket.on("receive-message", (data) => {

        displayMessage(data);

    });


    // User joined

    socket.on("user-joined", (data) => {

        displaySystemMessage(
            data.message
        );

    });

}


// =========================
// DISPLAY MESSAGE
// =========================

function displayMessage(data) {

    const messageElement =
        document.createElement("div");


    messageElement.className =
        "message";


    const usernameElement =
        document.createElement("strong");

    usernameElement.textContent =
        data.username;


    const messageText =
        document.createElement("span");

    messageText.textContent =
        data.message;


    const timeElement =
        document.createElement("small");

    timeElement.textContent =
        data.time;


    messageElement.appendChild(
        usernameElement
    );

    messageElement.appendChild(
        document.createElement("br")
    );

    messageElement.appendChild(
        messageText
    );

    messageElement.appendChild(
        timeElement
    );


    messages.appendChild(
        messageElement
    );


    messages.scrollTop =
        messages.scrollHeight;

}


// =========================
// SYSTEM MESSAGE
// =========================

function displaySystemMessage(text) {

    const systemMessage =
        document.createElement("div");


    systemMessage.className =
        "message";


    systemMessage.textContent =
        text;


    messages.appendChild(
        systemMessage
    );


    messages.scrollTop =
        messages.scrollHeight;

}


// =========================
// SEND MESSAGE
// =========================

messageForm.addEventListener("submit", (event) => {

    event.preventDefault();


    if (!socket || !currentUser) {
        return;
    }


    const message =
        messageInput.value.trim();


    if (!message) {
        return;
    }


    socket.emit("send-message", {

        room: room,

        username: currentUser.username,

        message: message

    });


    messageInput.value = "";

    messageInput.focus();

});


// =========================
// LOGOUT
// =========================

logoutBtn.addEventListener("click", () => {

    if (socket) {

        socket.emit(
            "leave-room",
            room
        );

        socket.disconnect();

        socket = null;
    }


    currentUser = null;


    chatScreen.classList.add("hidden");

    authScreen.classList.remove("hidden");


    document.getElementById(
        "login-email"
    ).value = "";

    document.getElementById(
        "login-password"
    ).value = "";

});