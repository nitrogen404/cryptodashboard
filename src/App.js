import NewsFeed from "./components/NewsFeed";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <>
      <head>
        <title>Chan's CryptoExchange</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <div className="container px-10 py-10 h-screen w-screen">
        <CurrencyConverter></CurrencyConverter>
        <NewsFeed></NewsFeed>
      </div>
    </>
  );
}

export default App;
