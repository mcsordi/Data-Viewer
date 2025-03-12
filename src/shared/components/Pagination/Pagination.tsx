import React from 'react';
import { ArrowPagination } from '../ArrowPagination/ArrowPagination';
import { LoopPages } from '../LoopPages/LoopPages';
import { SetURLSearchParams } from 'react-router-dom';

type TPagination = {
  setSearchParams: SetURLSearchParams;
  numOfPages: number | undefined;
  currentPage: number;
  loopPagination: number[];
};

export const Pagination: React.FC<TPagination> = ({
  setSearchParams,
  numOfPages,
  currentPage,
  loopPagination,
}) => {
  return (
    <>
      <ArrowPagination
        setSearchParams={setSearchParams}
        numOfPages={numOfPages}
        currentPage={currentPage}
      />
      <LoopPages
        currentPage={currentPage}
        loopPagination={loopPagination}
        setSearchParams={setSearchParams}
      />
      <ArrowPagination
        edition="rotate-180"
        setSearchParams={setSearchParams}
        numOfPages={numOfPages}
        currentPage={currentPage}
      />
    </>
  );
};
