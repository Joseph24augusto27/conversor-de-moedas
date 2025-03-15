const convertButton = document.querySelector(".convert-button");
const currencySelectFirst = document.querySelector(".currency-select-first");
const currencySelect = document.querySelector(".currency-select");
const inputCurrency = document.querySelector(".input-currency");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value-converted");
const currencyImage = document.querySelector(".currency-img");
const currencyName = document.getElementById("currency-name");

const exchangeRates = {
    real: 1.00,
    dolar: 5.15,
    euro: 6.41,
    bitcoin: 592.60
};

function convertValues() {
    const inputValue = parseFloat(inputCurrency.value);
    
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
    
    const convertedValue = (inputValue / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: fromCurrency === "real" ? "BRL" : fromCurrency === "dolar" ? "USD" : fromCurrency === "euro" ? "EUR" : "BTC",
        minimumFractionDigits: fromCurrency === "bitcoin" ? 8 : 2
    }).format(inputValue);
    
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: toCurrency === "real" ? "BRL" : toCurrency === "dolar" ? "USD" : toCurrency === "euro" ? "EUR" : "BTC",
        minimumFractionDigits: toCurrency === "bitcoin" ? 8 : 2
    }).format(convertedValue);
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

convertButton.addEventListener("click", convertValues);
currencySelect.addEventListener("change", changeCurrency);
currencySelectFirst.addEventListener("change", convertValues);
