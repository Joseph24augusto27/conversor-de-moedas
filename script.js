const convertButton = document.querySelector(".convert-button");
const currencySelectFirst = document.querySelector(".currency-select-first");
const currencySelect = document.querySelector(".currency-select");
const inputCurrency = document.querySelector(".input-currency");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value-converted");
const currencyImage = document.querySelector(".currency-img");
const currencyName = document.getElementById("currency-name");

const exchangeRates = {
    real: 1.00,     // 1 Real como base
    dolar: 4.95,    // 1 Dólar = 4.95 Reais
    euro: 5.38,     // 1 Euro = 5.38 Reais 
    bitcoin: 313000 // 1 Bitcoin = 313.000 Reais
};

function convertValues() {
    const inputValue = parseFloat(inputCurrency.value.replace(',', '.'));
    
    if (isNaN(inputValue) || inputValue <= 0) {
        alert("Por favor, insira um valor válido para conversão.");
        return;
    }
    
    const fromCurrency = currencySelectFirst.value;
    const toCurrency = currencySelect.value;
    
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        alert("Selecione moedas válidas para conversão.");
        return;
    }
    
    const convertedValue = (inputValue * exchangeRates[fromCurrency]) / exchangeRates[toCurrency];
    
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: getCurrencyCode(fromCurrency),
        minimumFractionDigits: fromCurrency === "bitcoin" ? 8 : 2
    }).format(inputValue);
    
    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: getCurrencyCode(toCurrency),
        minimumFractionDigits: toCurrency === "bitcoin" ? 8 : 2
    }).format(convertedValue);
}

function getCurrencyCode(currency) {
    const currencyCodes = {
        real: "BRL",
        dolar: "USD",
        euro: "EUR",
        bitcoin: "BTC"
    };
    return currencyCodes[currency] || "BRL";
}

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

function changeOriginCurrency() {
    const currencyData = {
        real: { name: "Real Brasileiro", img: "./assets/brasil 2.png" },
        dolar: { name: "Dólar Americano", img: "./assets/dollar$.png" },
        euro: { name: "Euro", img: "./assets/euro.png" },
        bitcoin: { name: "Bitcoin", img: "./assets/bitcoin 1.png" }
    };

    const selectedCurrency = currencySelectFirst.value;
    
    if (currencyData[selectedCurrency]) {
        currencyValueToConvert.innerHTML = currencyData[selectedCurrency].name;
        document.querySelector(".img-real").src = currencyData[selectedCurrency].img;
    }
    
    convertValues();
}

// Chama a função para converter valores ao clicar no botão
convertButton.addEventListener("click", convertValues);

// Chama a função para mudar a moeda e recalcular a conversão
currencySelect.addEventListener("change", changeCurrency);
currencySelectFirst.addEventListener("change", changeOriginCurrency);