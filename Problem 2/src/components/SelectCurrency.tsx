import React from "react";
import { CurrencyType } from "../App";

type SelectInputProps = {
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  currency: CurrencyType[];
  selectedCurrency: string;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  title,
  currency,
  selectedCurrency,
  handleCurrencyChange,
}) => {
  return (
    <>
      <label htmlFor="input-amount" className="text-zinc-400">
        {title}
      </label>
      <div className="flex justify-between">
        <select
          className="text-indigo-900 font-bold"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {currency.map((curr) => (
            <option value={curr.currency} key={curr.currency}>
              {curr.currency}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="number"
          className="border w-28 h-9 bg-gray-200 rounded-md text-center"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SelectInput;
