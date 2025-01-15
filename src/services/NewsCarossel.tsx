import { useState, useEffect } from 'react';

interface NewsItem {
  category: string;
  headline: string;
  source: string;
  color: string;
}

interface ITheme {
  isDark: boolean;
}

const NewsCarossel: React.FC<ITheme> = ({ isDark }) => {
  const [position, setPosition] = useState<number>(0);
  
  const news: NewsItem[] = [
    { 
      category: 'BREAKING',
      headline: 'Major Tech Announcement Expected Today',
      source: 'Tech News',
      color: 'text-red-500'
    },
    { 
      category: 'MARKETS',
      headline: 'Global Markets Hit New High',
      source: 'Financial Times',
      color: 'text-green-500'
    },
    { 
      category: 'POLITICS',
      headline: 'Key Policy Reform Passes Senate',
      source: 'Politics Daily',
      color: 'text-blue-500'
    },
    { 
      category: 'SPORTS',
      headline: 'Championship Final Set for Weekend',
      source: 'Sports Network',
      color: 'text-yellow-500'
    },
    { 
      category: 'TECH',
      headline: 'New AI Breakthrough Announced',
      source: 'Tech Review',
      color: 'text-purple-500'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((prevPosition) => (prevPosition - 1) % (news.length * 400));
    }, 50);

    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <div className={`relative w-full ${isDark ? 'bg-darkBg transition-all duration-500 text-white' : 'bg-white text-deepBg'} overflow-hidden py-1 flex items-center`}>
      <div className={`z-20 px-2 absolute left-0 ${isDark ? 'bg-darkBg' : 'bg-white'}`}>
        <h1 className="font-semibold">
          Latest News:
        </h1>
      </div>
      <div
        className="flex whitespace-nowrap gap-16 pl-32 text-xs"
        style={{ transform: `translateX(${position}px)` }}
      >
        {news.concat(news).map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3"
          >
            <span className={`${item.color} font-bold`}>{item.category}</span>
            <span className="font-medium">{item.headline}</span>
            <span className="text-gray-500">- {item.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCarossel;