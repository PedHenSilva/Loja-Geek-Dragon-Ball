function carregarBanco() {
    if (!localStorage.getItem("usuariosDB")) {
        let usuarios = [
            { id: 1, login: "Bulma", password: "123", email: "bulma@gmail.com" },
            { id: 2, login: "Vegeta", password: "1234", email: "vegeta@gmail.com" },
            { id: 3, login: "Kuririn", password: "12345", email: "kuririn@gmail.com" }
        ];
        localStorage.setItem("usuariosDB", JSON.stringify(usuarios));
    }
}

function limpar() {
    document.querySelector("#login") && (document.querySelector("#login").value = "");
    document.querySelector("#email") && (document.querySelector("#email").value = "");
    document.querySelector("#senha") && (document.querySelector("#senha").value = "");
}

function login() {
    carregarBanco();

    let emailDigitado = document.querySelector("#email")?.value;
    let senhaDigitada = document.querySelector("#senha")?.value;

    let banco = JSON.parse(localStorage.getItem("usuariosDB"));

    let user = banco.find(u => u.email === emailDigitado && u.password === senhaDigitada);

    if (user) {
        sessionStorage.setItem("usuarioLogado", JSON.stringify(user));
        alert("Login realizado! Redirecionando...");
        window.location.href = "index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

function logout() {
    sessionStorage.removeItem("usuarioLogado");
    alert("Logout realizado!");
    window.location.href = "login.html";
}

function cadastrar() {
    carregarBanco();

    let ds = JSON.parse(localStorage.getItem("usuariosDB"));

    let lg = document.querySelector("#login")?.value;
    let ma = document.querySelector("#email")?.value;
    let ps = document.querySelector("#senha")?.value;

  
    let dado = { id: Date.now(), login: lg, password: ps, email: ma };

    ds.push(dado);

    localStorage.setItem("usuariosDB", JSON.stringify(ds));

    alert("Conta criada com sucesso!");
    limpar();
}
