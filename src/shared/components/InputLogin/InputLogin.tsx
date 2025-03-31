/* eslint-disable react/prop-types */
import { IoEyeOff, IoEyeSharp } from 'react-icons/io5';
import { TInputLogin } from '../../types/InputLogin';
import { useState } from 'react';
import { useField } from 'formik';

export const InputLogin: React.FC<TInputLogin> = ({
  labelText,
  id,
  typeInput,
  ...props
}) => {
  const [inputType, setInputType] = useState<'text' | 'password'>('text');
  const [field, meta] = useField(props);

  return (
    <>
      <div className="flex flex-col">
        <label
          className="mb-0.5 text-md font-black text-gray-500"
          htmlFor="email"
        >
          {labelText}
        </label>
        <input
          {...field}
          {...props}
          type={id == 'pass' ? inputType : typeInput}
          id={id}
          className="border border-gray-400 rounded-md outline-none p-2 bg-white"
        />
        {id == 'pass' && (
          <div className="relative">
            {inputType == 'text' ? (
              <IoEyeSharp
                onClick={() =>
                  setInputType((prev) => (prev == 'text' ? 'password' : 'text'))
                }
                className={
                  'text-2xl block absolute  right-0 bottom-2 mr-2 cursor-pointer'
                }
              />
            ) : (
              <IoEyeOff
                className="text-2xl block absolute right-0 bottom-2 mr-2 cursor-pointer"
                onClick={() =>
                  setInputType((prev) =>
                    prev == 'password' ? 'text' : 'password',
                  )
                }
              />
            )}
          </div>
        )}
      </div>
      <div className="text-red-600 text-sm font-medium pt-2 mb-1">
        {meta.touched && meta.error && meta.error}
      </div>
    </>
  );
};
