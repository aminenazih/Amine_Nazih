import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';


interface FormData {
  sourceCurrency: string;
  targetCurrency: string;
  amount: number;
}

interface TokenPrices {
  [key: string]: number;
}

const App: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [tokens, setTokens] = useState<string[]>([]);
  const [prices, setPrices] = useState<TokenPrices>({});
  const [convertedAmount, setConvertedAmount] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch token prices from the API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get<TokenPrices>('https://interview.switcheo.com/prices.json');
        setPrices(response.data);
        setTokens(Object.keys(response.data));
      } catch (error) {
        console.error('Error fetching token prices:', error);
      }
    };
    fetchPrices();
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { sourceCurrency, targetCurrency, amount } = data;

    if (sourceCurrency === targetCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const sourcePrice = prices[sourceCurrency];
    const targetPrice = prices[targetCurrency];

    if (sourcePrice && targetPrice) {
      const rate = targetPrice / sourcePrice;
      const converted = amount * rate;
      setConvertedAmount(converted);
    } else {
      setConvertedAmount('Error: Missing price data');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Currency Swap</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="sourceCurrency" className="form-label">Source Currency</label>
          <select id="sourceCurrency" {...register('sourceCurrency', { required: 'Please select a source currency' })} className="form-select">
            <option value="">Select Source Currency</option>
            {tokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
          {errors.sourceCurrency && <div className="text-danger">{errors.sourceCurrency.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="targetCurrency" className="form-label">Target Currency</label>
          <select id="targetCurrency" {...register('targetCurrency', { required: 'Please select a target currency' })} className="form-select">
            <option value="">Select Target Currency</option>
            {tokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
          {errors.targetCurrency && <div className="text-danger">{errors.targetCurrency.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            id="amount"
            type="number"
            step="any"
            {...register('amount', { required: 'Please enter an amount', min: { value: 0, message: 'Amount must be greater than 0' } })}
            className="form-control"
          />
          {errors.amount && <div className="text-danger">{errors.amount.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Swap'}
        </button>
      </form>

      {convertedAmount !== null && (
        <div className="mt-4">
          <h4>Converted Amount:</h4>
          <p>{typeof convertedAmount === 'number' ? convertedAmount.toFixed(2) : convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default App;
