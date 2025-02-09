const convertButton = document.querySelector(".convert-button");
const currencySelectFirst = document.querySelector(".currency-select-first");
const currencySelect = document.querySelector(".currency-select");

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueToConverted = document.querySelector(".currency-value-converted");
    const currencyValueReal = document.querySelector(".currency-value-real");
    
    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, insira um valor válido para conversão.");
        return;
    }
    
    const exchangeRates = {
        real: 1.00,
        dolar: 5.15,  // Valor atualizado
        euro: 6.41,
        bitcoin: 592.60
    };
    
    const fromCurrency = currencySelectFirst.value;
    const toCurrency = currencySelect.value;
    
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        alert("Selecione moedas válidas para conversão.");
        return;
    }
    
    const convertedValue = (inputCurrencyValue / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    
    currencyValueToConverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: toCurrency === "real" ? "BRL" : toCurrency === "dolar" ? "USD" : toCurrency === "euro" ? "EUR" : "BTC",
        minimumFractionDigits: toCurrency === "bitcoin" ? 8 : 2
    }).format(convertedValue);
    
    currencyValueReal.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");
    
    const currencyData = {
        real: { name: "Real", img: "./assets/brasil.png" },
        dolar: { name: "Dólar", img: "./assets/dollar$.png" },
        euro: { name: "Euro", img: "./assets/euro.png" },
        bitcoin: { name: "Bitcoin", img: "./assets/bitcoin.png" }
    };
    
    const selectedCurrency = currencySelect.value;
    
    if (currencyData[selectedCurrency]) {
        currencyName.innerHTML = currencyData[selectedCurrency].name;
        currencyImage.src = currencyData[selectedCurrency].img;
    }
    
    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
currencySelectFirst.addEventListener("change", changeCurrency);
