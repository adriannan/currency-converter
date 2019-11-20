const btnClear = document.querySelector("#clear");

let amountFrom = document.querySelector("#amountFrom");
let amountTo = document.querySelector("#amountTo");

let currentRate = {};
let currentDate;

fetch("https://api.ratesapi.io/api/latest?base=PLN")
  .then(response => {
    if (response.ok) {
      return response;
    }
  })
  .then(response => response.json())
  .then(response => {
    currentRate = response.rates;
    currentDate = response.date;
    setRatio();
  });

let invalidChars = ["-", "+", "e"];

amountFrom.addEventListener("input", () => {
  amountFrom.addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;
  const amountToCalc = (
    (currentRate[currencyTo] / currentRate[currencyFrom]) *
    event.target.value
  ).toFixed(2);
  amountTo.value = amountToCalc;
  calcRatio(currencyFrom, currencyTo, amountToCalc, event.target.value);
});

amountTo.addEventListener("input", () => {
  amountTo.addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;
  const amountFromCalc = (
    (currentRate[currencyFrom] / currentRate[currencyTo]) *
    event.target.value
  ).toFixed(2);
  amountFrom.value = amountFromCalc;
  calcRatio(currencyFrom, currencyTo, event.target.value, amountFromCalc);
});

const reset = () => {
  amountTo.value = "";
  amountFrom.value = "";
  setRatio();
};
document.querySelector("#currencyFrom").addEventListener("change", () => {
  reset();
});
document.querySelector("#currencyTo").addEventListener("change", () => {
  reset();
});

const calcRatio = (curFrom, curTo, amountCalc, amount) => {
  document.querySelector(
    "#ratio"
  ).innerHTML = `${amount} ${curFrom} = ${amountCalc} ${curTo}`;
};

btnClear.addEventListener("click", () => {
  amountFrom.value = "";
  amountTo.value = "";
  setRatio();
});

const setRatio = date => {
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;

  document.querySelector("#ratioFirst").innerHTML = `1 ${currencyFrom} = ${(
    currentRate[currencyTo] / currentRate[currencyFrom]
  ).toFixed(3)} ${currencyTo}`;
  document.querySelector("#ratioSec").innerHTML = `1 ${currencyTo} = ${(
    currentRate[currencyFrom] / currentRate[currencyTo]
  ).toFixed(3)} ${currencyFrom}`;
  document.querySelector("#ratio").innerHTML = "";
  document.querySelector("#update").innerHTML = `Last update: ${currentDate}`;
};
