const CalcCash = props => {
  let symbol = props.currency + props.currencyConvert;
  let symbolSec = props.currencyConvert + props.currency;
  let selectedSymbol = props.currencyPairs.filter(
    pair => pair.symbol == symbol
  );
  let selectedSymbolSec = props.currencyPairs.filter(
    pair => pair.symbol == symbolSec
  );

  return (
    <div>
      <div>
        {`1 ${props.currency} = ${selectedSymbol[0].ratio.toFixed(2)} ${
          props.currencyConvert
        }`}
      </div>
      <div>
        {`1 ${props.currencyConvert} = ${selectedSymbolSec[0].ratio.toFixed(
          2
        )} ${props.currency}`}
      </div>
    </div>
  );
};

const SelectedValue = props => {
  return (
    <select value={props.currency} onChange={props.onChange}>
      <option value="PLN">PLN</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  );
};

class CurrencyConventer extends React.Component {
  state = {
    amount: "",
    amountConvert: "",
    currency: "PLN",
    currencyConvert: "EUR"
  };

  static defaultProps = {
    currencyPairs: [
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
    ]
  };

  handleChange = (amount, currency, currencyConvert) => {
    let amountConvert = this.convertAmount(
      event.target.value,
      currency,
      currencyConvert
    );
    this.setState({
      amount: event.target.value,
      amountConvert: amountConvert.toFixed(2)
    });
  };
  handleChangeInvert = (amountConvert, currencyConvert, currency) => {
    let amount = this.convertAmount(
      event.target.value,
      currency,
      currencyConvert
    );
    this.setState({
      amount: amount.toFixed(2),
      amountConvert: event.target.value
    });
  };
  handleSelect = curr => {
    this.setState({
      [curr]: event.target.value
    });
  };
  handleClick = e => {
    this.setState({
      amount: "",
      amountConvert: ""
    });
  };
  convertAmount = (amount, currency, currencyConvert) => {
    let amountConvert;
    let symbol = currency + currencyConvert;
    let selectedSymbol = this.props.currencyPairs.filter(
      pair => pair.symbol == symbol
    );
    amountConvert = amount * selectedSymbol[0].ratio;
    return amountConvert;
  };

  render() {
    const { amount, amountConvert, currency, currencyConvert } = this.state;
    this.convertAmount(amount, currency, currencyConvert);

    return (
      <>
        <h1>Currency Converter</h1>
        <form>
          <SelectedValue
            currency={currency}
            onChange={() => this.handleSelect("currency")}
          />
          <input
            type="number"
            value={amount}
            onChange={() =>
              this.handleChange(amount, currency, currencyConvert)
            }
          />
          <br />
          <SelectedValue
            currency={currencyConvert}
            onChange={() => this.handleSelect("currencyConvert")}
          />
          <input
            type="number"
            value={amountConvert}
            onChange={() =>
              this.handleChangeInvert(amountConvert, currency, currencyConvert)
            }
          />
        </form>
        <CalcCash
          amount={amount}
          amountConvert={amountConvert}
          currency={currency}
          currencyConvert={currencyConvert}
          currencyPairs={this.props.currencyPairs}
        />
        <button onClick={this.handleClick}>Clear</button>
      </>
    );
  }
}
ReactDOM.render(<CurrencyConventer />, document.getElementById("root"));
