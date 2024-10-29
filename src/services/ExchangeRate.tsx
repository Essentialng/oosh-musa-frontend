import { useState, useEffect } from 'react';

interface Rate {
  currency: string;
  rate: number;
  flag?: string;
}

interface ITheme {
    isDark:boolean
}

const MovingMoneyRate: React.FC<ITheme> = ({isDark}) => {
  const [position, setPosition] = useState<number>(0);
  const rates: Rate[] = [
    { currency: 'USD/EUR', rate: 0.92 },
    { currency: 'USD/GBP', rate: 0.79 },
    { currency: 'USD/JPY', rate: 134.56 },
    { currency: 'USD/CAD', rate: 1.35 },
    { currency: 'USD/AUD', rate: 1.48 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((prevPosition) => (prevPosition - 1) % (rates.length * 200));
    }, 100);

    return () => clearInterval(timer);
  }, [rates.length]);

  return (
    <div className={`w-full ${isDark ? 'bg-darkBg transition-all duration-500 text-darkText' : 'bg-lightBg text-left'} overflow-hidden py-2`}>
      <div
        className="flex whitespace-nowrap"
        style={{ transform: `translateX(${position}px)` }}
      >
        {rates.concat(rates).map((rate, index) => (
          <div
            key={index}
            className="inline-block mx-4 font-mono"
          >
            {rate.currency}: {rate.rate.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingMoneyRate;