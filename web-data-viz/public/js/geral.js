function configurarIconeOlho(idInput, idIcone, srcOlhoBrancoFechado, srcOlhoAzulFechado, srcOlhoAzulAberto) {
    const input = document.getElementById(idInput);
    const icone = document.getElementById(idIcone);

    let visivel = false;


    input.addEventListener("focus", () => {
        input.style.color = "#002B96";
        if (!visivel) {
            icone.src = srcOlhoAzulFechado;
        }
    });


    input.addEventListener("blur", () => {
        input.style.color = "#ffffff";
        if (visivel) {
            icone.src = srcOlhoBrancoFechado;
            input.type = "password";
            visivel = false;
        } else {
            icone.src = srcOlhoBrancoFechado;
        }
    });

    icone.addEventListener("mousedown", (event) => {
        if (document.activeElement === input) {
            event.preventDefault();
            visivel = true;
            input.type = "text";
            icone.src = srcOlhoAzulAberto;
        }
    });


    icone.addEventListener("mouseup", () => {

        if (document.activeElement === input) {
            visivel = false;
            input.type = "password";
            icone.src = srcOlhoAzulFechado;
        }
    });


    icone.addEventListener("mouseleave", () => {
        if (document.activeElement === input) {
            visivel = false;
            input.type = "password";
            
            icone.src = srcOlhoAzulFechado;
        }
    });
}

configurarIconeOlho(
    "senha_input",
    "iconeOlho1",
    "./assets/icon/iconeOlhoBrancoFechado.png",
    "./assets/icon/iconeOlhoAzulFechado.png",
    "./assets/icon/iconeOlhoAzulaberto.png"
);

configurarIconeOlho(
    "confirmacao_senha_input",
    "iconeOlho2",
    "./assets/icon/iconeOlhoBrancoFechado.png",
    "./assets/icon/iconeOlhoAzulFechado.png",
    "./assets/icon/iconeOlhoAzulaberto.png"
);

