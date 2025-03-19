import React from 'react';

export const HeaderPage: React.FC<{ text: string }> = ({ text }) => {
  return <h1 className="text-4xl pb-3 font-medium">{text}</h1>;
};
