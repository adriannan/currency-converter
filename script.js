// alert("ok");
// const currencyFrom = document.querySelector("#currencyFrom");
// const currencyTo = document.querySelector("#currencyTo");

let amountFrom = document.querySelector("#amountFrom");
let amountTo = document.querySelector("#amountTo");

const currencyPairs = [
  {
    symbol: "PLNEUR",
    ratio: 0.234
  },
  {
    symbol: "PLNUSD",
    ratio: 0.261
  },
  {
    symbol: "EURPLN",
    ratio: 4.269
  },
  {
    symbol: "EURUSD",
    ratio: 1.113
  },
  {
    symbol: "USDPLN",
    ratio: 3.835
  },
  {
    symbol: "USDEUR",
    ratio: 0.898
  },
  {
    symbol: "PLNPLN",
    ratio: 1
  },
  {
    symbol: "USDUSD",
    ratio: 1
  },
  {
    symbol: "EUREUR",
    ratio: 1
  }
];

amountFrom.addEventListener("input", () => {
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;

  let symbol = currencyFrom + currencyTo;

  let select = currencyPairs.filter(pair => pair.symbol == symbol);
  amountTo.value = event.target.value * select[0].ratio;
});

amountTo.addEventListener("input", () => {
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;

  let symbol = currencyTo + currencyFrom;

  let select = currencyPairs.filter(pair => pair.symbol == symbol);
  amountFrom.value = event.target.value * select[0].ratio;
});

document.querySelector("#currencyFrom").addEventListener("change", () => {
  amountTo.value = 0;
  amountFrom.value = 0;
  setRatio();
});
document.querySelector("#currencyTo").addEventListener("change", () => {
  amountTo.value = 0;
  amountFrom.value = 0;
  setRatio();
});

const setRatio = () => {
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;

  let symbol = currencyFrom + currencyTo;

  let select = currencyPairs.filter(pair => pair.symbol == symbol);

  document.querySelector(
    "#ratioFirst"
  ).innerHTML = `1 ${currencyFrom} = ${select[0].ratio} ${currencyTo}`;
  document.querySelector("#ratioSec").innerHTML = `1 ${currencyTo} = ${(
    1 / select[0].ratio
  ).toFixed(3)} ${currencyFrom}`;
};
setRatio();
