const convertButton = document.querySelector(".convert-button");
const currencySelectFirst = document.querySelector(".currency-select-first");
const currencySelect = document.querySelector(".currency-select");
const inputCurrency = document.querySelector(".input-currency");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value-converted");
const currencyImage = document.querySelector(".currency-img");
const currencyName = document.getElementById("currency-name");

// Use um objeto para armazenar taxas de câmbio com precisão
const exchangeRates = {
    real: 1,        // Base 1 Real
    dolar: 4.95,    // 1 Dólar = 4.95 Reais
    euro: 5.38,     // 1 Euro = 5.38 Reais 
    bitcoin: 313000 // 1 Bitcoin = 313.000 Reais
};

function safeParseNumber(value) {
    // Remove todos os caracteres exceto números, vírgula e ponto
    const cleanValue = value.replace(/[^\d,\.]/g, '');
    
    // Substitui vírgula por ponto se existir
    const normalizedValue = cleanValue.replace(',', '.');
    
    // Converte para número, garantindo um valor padrão de 0 se falhar
    return parseFloat(normalizedValue) || 0;
}

function convertValues() {
    // Use a função de parsing segura
    const inputValue = safeParseNumber(inputCurrency.value);
    
    if (inputValue <= 0) {
        alert("Por favor, insira um valor válido para conversão.");
        return;
    }
    
    const fromCurrency = currencySelectFirst.value;
    const toCurrency = currencySelect.value;
    
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        alert("Selecione moedas válidas para conversão.");
        return;
    }
    
    // Cálculo de conversão mais preciso
    const convertedValue = (inputValue * exchangeRates[fromCurrency]) / exchangeRates[toCurrency];
    
    // Formatação consistente de moeda
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

// Eventos
convertButton.addEventListener("click", convertValues);
currencySelect.addEventListener("change", changeCurrency);
currencySelectFirst.addEventListener("change", changeOriginCurrency);