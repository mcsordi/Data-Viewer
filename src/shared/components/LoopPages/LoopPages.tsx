import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

type TLoopPages = {
  loopPagination: number[];
  currentPage: number;
  setSearchParams: SetURLSearchParams;
};
export const LoopPages: React.FC<TLoopPages> = ({
  loopPagination,
  currentPage,
  setSearchParams,
}) => {
  return (
    <div className="flex max-w-48 truncate">
      {loopPagination?.map((el, idx) => {
        return (
          <div
            className={`${el === currentPage && 'bg-amber-300 text-white rounded-md px-2 dark:text-neutral-800'} ${el > 0 ? 'visible' : 'hidden'} px-1 cursor-pointer text-2xl`}
            key={idx}
            onClick={(e) => {
              setSearchParams((prev: URLSearchParams) => {
                prev.set('pagina', e.currentTarget.innerHTML);
                return prev;
              });
            }}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
};
