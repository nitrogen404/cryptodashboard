import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";


const CurrencyConverter = () => {
      const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
      const [choosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('BTC');
      const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
      const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC');
      const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC');

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
                  setPrimaryCurrencyExchanged(choosenPrimaryCurrency);
                  setSecondaryCurrencyExchanged(chosenSecondaryCurrency);
                  
            }).catch(function (error) {
                  console.error(error);
            });
      };
      console.log("Primary currency exchanged ", primaryCurrencyExchanged);
      console.log("secondary currency exchanged ", secondaryCurrencyExchanged)

      return (
            <div className="container mx-auto px-10 py-10 bg-slate-100 rounded-lg">
                  <h2 className="font-sans text-5xl">Currency Converter</h2>
                  <div className="py-10 pl-5">
                        <table>
                              <tbody>
                                    <tr>
                                          <td className="font-sans text-xl">Primary Currency</td>
                                          <td>
                                                <input className="text-center" type="number" name="currency-amount-1" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                                          </td>
                                          <td>
                                                <select  value={choosenPrimaryCurrency} 
                                                      name="currency-option-1" 
                                                      className="currency-options text-center font-sans text-xs"
                                                      onChange={(e) => setChoosenPrimaryCurrency(e.target.value)}
                                                >
                                                      {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                                </select>
                                          </td>
                                    </tr>

                                    <tr>
                                          <td className="font-sans text-xl">Secondary Currency</td>
                                          <td>
                                                <input className="text-center" type="number" name="currency-amount-2" value={result} disabled={true}></input>
                                          </td>
                                          <td>
                                                <select value={chosenSecondaryCurrency} 
                                                      name="currency-option-2" 
                                                      className="currency-options text-center font-sans text-xs" 
                                                      onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                                >
                                                      {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                                </select>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                        <button className="rounded-lg bg-cyan-500 p-5 m-5 font-sans text-2xl font-medium text-center text-white" id="convert-button" onClick={currencyConversion}>Convert</button>
                  </div> 
                  
                  <ExchangeRate exchangeRate={exchangeRate} 
                              lastRefreshed={lastRefreshed} 
                              choosenPrimaryCurrency={primaryCurrencyExchanged} 
                              chosenSecondaryCurrency={secondaryCurrencyExchanged} >
                  </ExchangeRate>
            </div>
      )
}

export default CurrencyConverter;
