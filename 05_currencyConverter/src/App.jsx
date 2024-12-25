import React, { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrInfo from "./hooks/useCurrInfo";
const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState(0);

  const currInfo = useCurrInfo(from);
  const options = Object.keys(currInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmt);
    setConvertedAmt(amount);
  };

  const convert = () => {
    if (!currInfo[to]) {
      alert("Conversion rate not available");
      return;
    }
    setConvertedAmt((amount * currInfo[to]).toFixed(4));
  };

  return (
    <div
      className="w-full font-bold text-2xl h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(
        "https://4kwallpapers.com/images/wallpapers/bull-stock-market-1920x1200-13813.png"
        )`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                currencyOptions={options}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmt}
                onAmountChange={(amount) => setConvertedAmt(amount)}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                currencyOptions={options}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              disabled={!amount || !currInfo[to]}
              className={`w-full px-4 py-3 rounded-lg ${
                !amount || !currInfo[to]
                  ? "bg-gray-400"
                  : "bg-blue-600 text-white"
              }`}
            >
              Convert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
