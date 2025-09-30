import React from 'react';

const FloatingSignature: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
        <span className="text-white/80 text-sm font-medium tracking-wide">
          ByPL8 <span className="text-pink-300">♥</span>
        </span>
      </div>
    </div>
  );
};

export default FloatingSignature;
