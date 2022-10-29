const ExchangeRate = ({exchangeRate, lastRefreshed, choosenPrimaryCurrency, chosenSecondaryCurrency}) => {
      return (
            <div className="exchange-rate font-sans">
                  <h2 className="font-medium text-3xl">Exchange Rate</h2>
                  <h4 className="font-normal text-2xl">{exchangeRate}</h4>
                  <p className="font-normal text-2xl">{choosenPrimaryCurrency} to {chosenSecondaryCurrency}</p>
                  <p className="font-normal text-2xl text-black">Exchange rate last updated at {lastRefreshed}</p>
            </div>
      )
}

export default ExchangeRate;
