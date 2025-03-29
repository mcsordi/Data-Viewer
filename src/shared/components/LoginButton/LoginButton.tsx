import React from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

export const LoginButton: React.FC<{ loading: boolean; btnText: string }> = ({
  loading,
  btnText,
}) => {
  return (
    <button
      disabled={loading}
      type="submit"
      className="hover:bg-slate-500 hover:text-white transition-all flex items-center justify-center mt-3 p-2 rounded-md bg-amber-300 font-bold text-zinc-800 text-lg cursor-pointer disabled:bg-gray-300"
    >
      {loading ? (
        <CgSpinnerAlt className="text-2xl my-0.5 animate-spin" />
      ) : (
        btnText
      )}
    </button>
  );
};
