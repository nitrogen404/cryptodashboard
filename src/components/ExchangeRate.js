const ExchangeRate = ({exchangeRate, lastRefreshed, choosenPrimaryCurrency, chosenSecondaryCurrency}) => {
      return (
            <div className="exchange-rate">
                  <h2>Exchange Rate@</h2>
                  <h4>{exchangeRate}</h4>
                  <p>{choosenPrimaryCurrency} to {chosenSecondaryCurrency}</p>
                  <p>Exchange rate last updated at {lastRefreshed}</p>
            </div>
      )
}

export default ExchangeRate;
