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
        className={`${edition !== 'rotate-180' && currentPage == 1 && 'text-slate-300 dark:text-neutral-500'}
         ${numOfPages != undefined && numOfPages < 1 && 'hidden'} ${edition} text-xl cursor-pointer font-bold
         ${currentPage == numOfPages && edition == 'rotate-180' && 'text-slate-300 dark:text-neutral-500'}`}
        onClick={() => {
          const minus =
            currentPage - 1 == 1 || currentPage == 1 ? 1 : currentPage - 1;
          if (numOfPages !== undefined) {
            const plus =
              currentPage < numOfPages ? currentPage + 1 : numOfPages;

            setSearchParams((prev: URLSearchParams) => {
              prev.set(
                'pagina',
                edition == 'rotate-180' ? plus.toString() : minus.toString(),
              );
              return prev;
            });
          }
        }}
      />
    </div>
  );
};
