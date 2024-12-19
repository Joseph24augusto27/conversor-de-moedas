const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")


function convertValues (){
    const inputCurrencyValue = document.querySelector(".input-currency").value

    
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueToConverted = document.querySelector(".currency-value-converted")
    
    const dolarToday = 6.15
    const euroToday = 6.41
    const bitcoinToday = 592.605 // valor exemplar
    

    if(currencySelect.value == "dolar") {

        currencyValueToConverted.innerHTML = new Intl.NumberFormat ("en-US", {
            style: "currency",
            currency:"USD"
          } ).format (inputCurrencyValue / dolarToday)
    }

    if(currencySelect.value == "euro") 

    {currencyValueToConverted.innerHTML = new Intl.NumberFormat ("de-DE", {
        style: "currency",
        currency: "EUR"
        } ).format(inputCurrencyValue/euroToday)}
    if(currencySelect.value == "bitcoin") {

        currencyValueToConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "BTC",
                minimumFractionDigits: 8
                } ).format(inputCurrencyValue/bitcoinToday)
}
    

     currencyValueToConvert.innerHTML = new Intl.NumberFormat ("pt-BR", {
      style: "currency",
      currency:"BRL"
    } ).format (inputCurrencyValue)  


console.log()

}

function changeCurency (){
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")


    if ( currencySelect.value == "dolar") 
        {
        currencyName.innerHTML = "dolar"
        currencyImage.src = "./assets/dollar$.png"
    }

    if ( currencySelect.value == "euro") 
        {
        currencyName.innerHTML = "Euro"
        currencyImage.src ="./assets/euro.png"
    }

    if ( currencySelect.value == "bitcoin") 
        {
        currencyName.innerHTML = "bitcoin"
        currencyImage.src ="./assets/bitcoin 1.png"
    }

    convertValues ()
}


currencySelect.addEventListener("change", changeCurency)
convertButton.addEventListener("click", convertValues )