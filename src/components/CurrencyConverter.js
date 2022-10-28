import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";


const CurrencyConverter = () => {
      const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
      const [choosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('BTC');
      const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
      const [amount, setAmount] = useState(1);
      const [exchangeRate, setExchangeRate] = useState('');
      const [result, setResult] = useState("");
      const [lastRefreshed, setRefreshed] = useState("");

      const currencyConversion = () => {
            
            const options = {
                  method: 'GET',
                  url: 'https://alpha-vantage.p.rapidapi.com/query',
                  params: {from_currency: choosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
                  headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API,
                    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
                  }
                };
                
            axios.request(options).then(function (response) {
                  console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                  setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                  setResult(exchangeRate * amount);
                  setRefreshed(response.data['Realtime Currency Exchange Rate']['6. Last Refreshed'])
            }).catch(function (error) {
                  console.error(error);
            });
      };
      console.log("result: ", result);
      return (
            <div className="currency-converter">
                  <h2>Currency Converter</h2>
                  <div>
                        <table>
                              <tbody>
                                    <tr>
                                          <td>Primary Currency</td>
                                          <td>
                                                <input type="number" name="currency-amount-1" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                                          </td>
                                          <td>
                                                <select value={choosenPrimaryCurrency} 
                                                      name="currency-option-1" 
                                                      className="currency-options"
                                                      onChange={(e) => setChoosenPrimaryCurrency(e.target.value)}
                                                >
                                                      {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                                </select>
                                          </td>
                                    </tr>

                                    <tr>
                                          <td>Secondary Currency</td>
                                          <td>
                                                <input type="number" name="currency-amount-2" value={result} disabled={true}></input>
                                          </td>
                                          <td>
                                                <select value={chosenSecondaryCurrency} 
                                                      name="currency-option-2" 
                                                      className="currency-options" 
                                                      onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                                >
                                                      {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                                </select>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                        <button id="convert-button" onClick={currencyConversion}>Convert</button>
                  </div>
                  <ExchangeRate exchangeRate={exchangeRate} 
                              lastRefreshed={lastRefreshed} 
                              choosenPrimaryCurrency={choosenPrimaryCurrency} 
                              chosenSecondaryCurrency={chosenSecondaryCurrency} >
                  </ExchangeRate>
            </div>
      )
}

export default CurrencyConverter;
