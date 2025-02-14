import React from 'react';
import { MdLightMode } from 'react-icons/md';

function App() {
  return (
    <div className="bg-white">
      <div className="bg-neutral-200 w-xs min-h-screen border border-gray-50 relative">
        <div className="border h-35 flex items-center justify-center">
          <div className="w-20 h-20 border-0 rounded-full">
            <img
              className="rounded-full"
              alt="profile image"
              src="../1678304807285.jpeg"
            />
          </div>
        </div>
        <div className="border flex flex-col flex-1 bg-white relative">a</div>
        <div className="flex items-center justify-center border h-20 bottom-0 absolute w-full">
          <MdLightMode /> Mudar Tema
        </div>
      </div>
    </div>
  );
}

export default App;
