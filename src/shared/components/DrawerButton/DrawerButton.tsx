import React from 'react';
import { RxDoubleArrowRight } from 'react-icons/rx';
type TDrawerButton = {
  handleClick: () => void;
  showDrawer: boolean;
};

export const DrawerButton: React.FC<TDrawerButton> = ({
  handleClick,
  showDrawer,
}) => {
  return (
    <button
      className="h-6 border border-neutral-300 visible sm:hidden"
      onClick={handleClick}
    >
      {showDrawer ? (
        <RxDoubleArrowRight className="rotate-180 ease-in-out transition duration-300" />
      ) : (
        <RxDoubleArrowRight className="ease-in-out transition duration-300" />
      )}
    </button>
  );
};
