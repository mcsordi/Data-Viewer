import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { SetURLSearchParams } from 'react-router-dom';
type TArrowPagination = {
  numOfPages: number | undefined;
  setSearchParams: SetURLSearchParams;
  edition?: string;
  currentPage: number;
};
export const ArrowPagination: React.FC<TArrowPagination> = ({
  numOfPages,
  setSearchParams,
  edition,
  currentPage,
}) => {
  return (
    <div>
      <FaChevronLeft
        className={`${numOfPages != undefined && numOfPages < 1 && 'hidden'} ${edition} text-xl cursor-pointer font-bold`}
        onClick={() => {
          const minus = currentPage - 1;
          if (numOfPages !== undefined) {
            const plus =
              currentPage < numOfPages ? currentPage + 1 : numOfPages;
            setSearchParams((prev: URLSearchParams) => {
              prev.set(
                'pagina',
                edition == 'rotate-180'
                  ? plus.toString()
                  : `${minus > 1 ? minus.toString() : '1'} `,
              );
              return prev;
            });
          }
        }}
      />
    </div>
  );
};
