import React from 'react';
import { MdLightMode } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';

export const CommonPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-row bg-white">
      <div className="bg-neutral-200 w-xs min-h-screen border border-slate-400 relative">
        <div className="bg-white border border-r-0 border-slate-400 h-28 flex items-center justify-center">
          <div className="w-20 h-20 border-0 rounded-full">
            <img
              className="rounded-full"
              alt="profile image"
              src="../1678304807285.jpeg"
            />
          </div>
        </div>
        <div className="border border-t-0 border-slate-400 border-r-0 flex flex-col flex-1 bg-white relative items-center justify-center">
          <div className="flex items-center gap-5 justify-center border w-full text-center border-r-0 border-l-0 border-slate-400 border-t-0">
            <div className="w-1/4 flex items-end justify-end">
              <FaHome />
            </div>
            <div className="w-1/2 flex items-start justify-start">
              <p>Página Inicial</p>
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center border w-full text-center border-r-0 border-l-0 border-slate-400 border-t-0">
            <div className="w-1/4 flex items-end justify-end">
              <FaHome />
            </div>
            <div className="w-1/2 flex items-start justify-start">
              <p>Cidades</p>
            </div>
          </div>
          <div className="flex items-center gap-5 justify-center border w-full text-center border-r-0 border-l-0 border-slate-400 border-t-0">
            <div className="w-1/4 flex items-end justify-end">
              <FaHome />
            </div>
            <div className="w-1/2 flex items-start justify-start">
              <p>Pessoas</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex items-center justify-center border border-slate-400 border-r-0 h-15 bottom-0 absolute w-full gap-5">
          <MdLightMode /> Mudar Tema
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
