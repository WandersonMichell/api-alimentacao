var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

// Adicionando o POST para o formulário de registro
var signupForm = document.querySelector(".second-column .form"); // Seleciona o formulário de registro
signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os dados do formulário
    var formData = new FormData(signupForm);
    var data = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    // Envia os dados para o endpoint usando fetch
    fetch("https://api-alimentacao.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Converte a resposta para JSON
        } else {
            throw new Error("Erro ao enviar os dados para o servidor");
        }
    })
    .then(data => {
        console.log("Sucesso:", data); // Exibe a resposta do servidor
        mostrarNotificacao('Conta criada com sucesso!');
    })
    .catch(error => {
        console.error("Erro:", error); // Exibe o erro no console
        mostrarNotificacao('Erro ao criar conta. Tente novamente mais tarde.');
    });
});
