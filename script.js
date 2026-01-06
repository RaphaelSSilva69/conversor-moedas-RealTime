const botao = document.getElementById("btn-converter");

async function converterMoeda() {

    const valorDigitado = document.getElementById("valor").value;
    const moedaSelecionada = document.getElementById("moeda").value;
    const campoResultado = document.getElementById("resultado");

    if (valorDigitado === "") {
        alert("Por favor, digite um valor!");
        return;
    }

    const linkApi = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";
    
    try {
        const resposta = await fetch(linkApi);
        const dados = await resposta.json();

        let taxa = 0;
        let simbolo = "";

        if (moedaSelecionada === "USD") {
            taxa = dados.USDBRL.bid;
            simbolo = "US$";
        } else if (moedaSelecionada === "EUR") {
            taxa = dados.EURBRL.bid;
            simbolo = "€";
        } else if (moedaSelecionada === "BTC") {
            taxa = dados.BTCBRL.bid;
            simbolo = "₿";
        }

        const resultadoFinal = valorDigitado / taxa;

        campoResultado.innerText = `${simbolo} ${resultadoFinal.toFixed(2)}`;

    } catch (erro) {
        alert("Erro ao buscar dados da API. Tente novamente mais tarde.");
    }
}

botao.addEventListener("click", converterMoeda);