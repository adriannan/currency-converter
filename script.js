// alert("ok");
// const currencyFrom = document.querySelector("#currencyFrom");
// const currencyTo = document.querySelector("#currencyTo");

const btnClear = document.querySelector("#clear");

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
let invalidChars = ["-", "+", "e"];

amountFrom.addEventListener("input", () => {
  amountFrom.addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;

  let symbol = currencyFrom + currencyTo;

  let select = currencyPairs.filter(pair => pair.symbol == symbol);
  amountTo.value = (event.target.value * select[0].ratio).toFixed(2);

  document.querySelector(
    "#ratio"
  ).innerHTML = `${amountFrom.value} ${currencyFrom} = ${amountTo.value} ${currencyTo}`;
});

amountTo.addEventListener("input", () => {
  amountTo.addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
  const currencyFrom = document.querySelector("#currencyFrom").value;
  const currencyTo = document.querySelector("#currencyTo").value;

  let symbol = currencyTo + currencyFrom;

  let select = currencyPairs.filter(pair => pair.symbol == symbol);
  amountFrom.value = (event.target.value * select[0].ratio).toFixed(2);

  document.querySelector(
    "#ratio"
  ).innerHTML = `${amountFrom.value} ${currencyFrom} = ${amountTo.value} ${currencyTo}`;
});

document.querySelector("#currencyFrom").addEventListener("change", () => {
  amountTo.value = "";
  amountFrom.value = "";
  setRatio();
});
document.querySelector("#currencyTo").addEventListener("change", () => {
  amountTo.value = "";
  amountFrom.value = "";
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
  document.querySelector("#ratio").innerHTML = "";
};
setRatio();

btnClear.addEventListener("click", () => {
  amountFrom.value = "";
  amountTo.value = "";
  setRatio();
});
