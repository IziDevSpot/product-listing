import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [show, setShow] = useState(true);
  const [dots, setDots] = useState(['', '', '']);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        const newDots = [...prevDots];
        const activeIndex = newDots.findIndex(dot => dot === '');
        if (activeIndex === -1) {
          return ['', '', ''];
        }
        newDots[activeIndex] = '.';
        return newDots;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-500 z-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Product management app</h1>
        <p className="text-xl text-white">
          Loading
          {dots.map((dot, index) => (
            <span 
              key={index} 
              style={{
                opacity: dot ? 1 : 0,
                transition: 'opacity 0.3s ease',
                marginLeft: '2px'
              }}
            >
              .
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;