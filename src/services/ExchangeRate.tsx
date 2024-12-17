import { useState, useEffect } from 'react';
import US from '../assets/flags/us.jpeg'
import EU from '../assets/flags/eu.jpeg'
import CN from '../assets/flags/cn.jpeg'
import JP from '../assets/flags/jp.jpeg'
import GB from '../assets/flags/gb.jpeg'
import AU from '../assets/flags/au.jpeg'

interface Rate {
  first_currency: string;
  second_currency: string;
  rate: number;
  first_flag?: string;
  second_flag?: string;
}

interface ITheme {
    isDark:boolean
}

const MovingMoneyRate: React.FC<ITheme> = ({isDark}) => {
  const [position, setPosition] = useState<number>(0);
  const rates: Rate[] = [
    { first_currency: 'USD', second_currency: 'EUR', rate: 0.92, first_flag: US, second_flag: EU},
    { first_currency: 'USD',second_currency: 'GBP', rate: 0.79, first_flag: US, second_flag: GB },
    { first_currency: 'USD', second_currency: 'JPY', rate: 134.56, first_flag: US, second_flag: JP },
    { first_currency: 'USD', second_currency: 'CAD', rate: 1.35, first_flag: US, second_flag: CN },
    { first_currency: 'USD', second_currency: 'AUD', rate: 1.48, first_flag: US, second_flag: AU },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((prevPosition) => (prevPosition - 1) % (rates.length * 200));
    }, 100);

    return () => clearInterval(timer);
  }, [rates.length]);

  return (
    <div className={`relative w-full ${isDark ? 'bg-darkBg transition-all duration-500 text-darkText' : 'bg-lightBg text-left'} overflow-hidden py-2`}>
      <div className={`z-50 px-2 absolute left-0 ${isDark ? 'bg-darkBg' : 'bg-white'}`}>
        <h1 >
          Exchange Rate:
        </h1>
      </div>
      <div
        className="flex whitespace-nowrap gap-10"
        style={{ transform: `translateX(${position}px)` }}
      >
        {rates.concat(rates).map((rate, index) => (
          <div
            key={index}
            className="mx-4 font-mono flex items-center"
          >
            <img className='w-4 h-3' src={rate.first_flag} alt='country flag'/> {rate.first_currency}/<img className='w-4 h-3' src={rate.second_flag} alt='country flag'/> {rate.second_currency} : {rate.rate.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingMoneyRate;