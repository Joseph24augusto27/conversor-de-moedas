const convertButton = document.querySelector(".convert-button");
const currencySelectFirst = document.querySelector(".currency-select-first");
const currencySelect = document.querySelector(".currency-select");
const inputCurrency = document.querySelector(".input-currency");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value-converted");
const currencyImage = document.querySelector(".currency-img");
const currencyName = document.getElementById("currency-name");

// Função para obter as taxas de câmbio
async function getExchangeRates() {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL");
    const data = await response.json();

    return {
        real: 1, // BRL como base
        dolar: parseFloat(data.USDBRL.high),
        euro: parseFloat(data.EURBRL.high),
        bitcoin: parseFloat(data.BTCBRL.high)
    };
}

// Função de conversão
async function convertValues() {
    const inputValue = parseFloat(inputCurrency.value) || 0;

    if (inputValue <= 0) {
        alert("Por favor, insira um valor válido para conversão.");
        return;
    }

    const exchangeRates = await getExchangeRates(); // Obtendo as taxas de câmbio
    const fromCurrency = currencySelectFirst.value;
    const toCurrency = currencySelect.value;

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        alert("Selecione moedas válidas para conversão.");
        return;
    }

    // Conversão da moeda de origem para BRL e depois para a moeda de destino
    const valueInBRL = inputValue * exchangeRates[fromCurrency];
    let convertedValue = valueInBRL / exchangeRates[toCurrency]; // Corrigido o cálculo

    // Atualiza os valores na tela
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: getCurrencyCode(fromCurrency),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(inputValue);

    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: getCurrencyCode(toCurrency),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(convertedValue);
}

// Retorna o código da moeda
function getCurrencyCode(currency) {
    const currencyCodes = {
        real: "BRL",
        dolar: "USD",
        euro: "EUR",
        bitcoin: "BTC"
    };
    return currencyCodes[currency] || "BRL";
}

// Função para alterar imagem e nome da moeda de destino
function changeCurrency() {
    const currencyData = {
        real: { name: "Real Brasileiro", img: "./assets/brasil 2.png" },
        dolar: { name: "Dólar Americano", img: "./assets/dollar$.png" },
        euro: { name: "Euro", img: "./assets/euro.png" },
        bitcoin: { name: "Bitcoin", img: "./assets/bitcoin 1.png" }
    };

    const selectedCurrency = currencySelect.value;
    if (currencyData[selectedCurrency]) {
        currencyName.innerHTML = currencyData[selectedCurrency].name;
        currencyImage.src = currencyData[selectedCurrency].img;
    }

    convertValues();
}

// Função para alterar imagem da moeda de origem
function changeOriginCurrency() {
    const currencyData = {
        real: { name: "Real Brasileiro", img: "./assets/brasil 2.png" },
        dolar: { name: "Dólar Americano", img: "./assets/dollar$.png" },
        euro: { name: "Euro", img: "./assets/euro.png" },
        bitcoin: { name: "Bitcoin", img: "./assets/bitcoin 1.png" }
    };

    const selectedCurrency = currencySelectFirst.value;
    if (currencyData[selectedCurrency]) {
        document.querySelector(".img-real").src = currencyData[selectedCurrency].img;
    }

    convertValues();
}

// Eventos
convertButton.addEventListener("click", convertValues);
currencySelect.addEventListener("change", changeCurrency);
currencySelectFirst.addEventListener("change", changeOriginCurrency);
