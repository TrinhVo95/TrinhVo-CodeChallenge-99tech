import axios from "axios";
import { useEffect, useState } from "react";
import SelectInput from "./components/SelectCurrency";

export type CurrencyType = {
  currency: string;
  data: string;
  price: number;
};

function App() {
  const [currency, setCurrency] = useState<CurrencyType[]>([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [selectedCurrency1, setSelectedCurrency1] = useState<string>("");
  const [selectedCurrency2, setSelectedCurrency2] = useState<string>("");

  const fetchCurrency = async () => {
    try {
      const res = await axios.get("https://interview.switcheo.com/prices.json");
      const uniqueCurrencies = res.data.filter(
        (curr: CurrencyType, index: number, arr: CurrencyType[]) =>
          arr.findIndex((c: CurrencyType) => c.currency === curr.currency) ===
          index
      );
      setCurrency(uniqueCurrencies);
      setSelectedCurrency1(uniqueCurrencies[0]?.currency || "");
      setSelectedCurrency2(uniqueCurrencies[0]?.currency || "");
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };
  useEffect(() => {
    fetchCurrency();
  }, []);
  useEffect(() => {
    calculateConvertedAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount1, selectedCurrency1, selectedCurrency2]);

  const calculateConvertedAmount = () => {
    if (selectedCurrency1 && selectedCurrency2) {
      const selectedRate1 =
        currency.find((curr) => curr.currency === selectedCurrency1)?.price ||
        0;
      const selectedRate2 =
        currency.find((curr) => curr.currency === selectedCurrency2)?.price ||
        0;

      setAmount2(
        Number(((amount1 * selectedRate2) / selectedRate1).toFixed(2))
      );
    }
  };
  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount1(Number(e.target.value));
  };

  const handleCurrency1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency1(e.target.value);
  };
  const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency2(e.target.value);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedCurrency1(selectedCurrency2);
    setSelectedCurrency2(selectedCurrency1);
  };

  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center">
      <form className="bg-gray-100 w-[360px] h-[703px] p-6">
        <h1 className="font-bold text-3xl my-3 text-center text-indigo-900 mt-6">
          Currency Converter
        </h1>
        <h4 className="text-slate-600 text-center">
          Check live rates, set rate alerts, receive notifications and more
        </h4>
        <div className="flex flex-col bg-white rounded-2xl shadow-md p-4 mt-7">
          <SelectInput
            id="input-amount"
            selectedCurrency={selectedCurrency1}
            onChange={handleAmount1Change}
            handleCurrencyChange={handleCurrency1Change}
            currency={currency}
            title="Amount"
            value={amount1}
          />

          <div className="relative flex items-center justify-center mb-6">
            <button
              className="mt-6 border rounded-full p-3 w-11 h-11 bg-indigo-900 mx-auto relative z-10"
              onClick={handleClick}
            >
              <img src="../public/arrow.png" alt="arrow" />
            </button>
            <div className="absolute top-2/3 bg-gray-200 h-px w-full"></div>
          </div>
          <SelectInput
            id="output-amount"
            selectedCurrency={selectedCurrency2}
            onChange={handleAmount1Change}
            handleCurrencyChange={handleCurrency2Change}
            currency={currency}
            title="Converted Amount"
            value={amount2}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
