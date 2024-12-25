import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const amountInputId = useId();
  return (
    <div className={`bg-white text-xl px-5 p-3 rounded-lg  flex ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0 || !isNaN(value))
              onAmountChange && onAmountChange(value);
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          disabled={currencyDisabled}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.length > 0 &&
            currencyOptions?.map((curr) => (
              <option key={curr} value={curr}>
                {curr.toUpperCase()}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
