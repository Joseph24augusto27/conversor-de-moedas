const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")


function convertValues (){
    const inputCurrencyValue = document.querySelector(".input-currency").value

    console.log( currencySelect.value)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueToConverted = document.querySelector(".currency-value-converted")
    
    const dolarToday = 6.15
    const euroToday = 6.41
    

    if(currencySelect.value == "dolar") {
         
        currencyValueToConverted.innerHTML = new Intl.NumberFormat ("en-US", {
            style: "currency",
            currency:"USD"
          } ).format (inputCurrencyValue / dolarToday) 

    }

    if(currencySelect.value == "euro") {
          currencyValueToConverted.innerHTML = new Intl.NumberFormat ("de-DE", {
          style: "currency",
          currency: "EUR"
          } ).format(inputCurrencyValue/euroToday)




    }


    currencyValueToConvert.innerHTML = new Intl.NumberFormat ("pt-BR", {
      style: "currency",
      currency:"BRL"
    } ).format (inputCurrencyValue)  

    

    console.log()
}

convertButton.addEventListener("click", convertValues )