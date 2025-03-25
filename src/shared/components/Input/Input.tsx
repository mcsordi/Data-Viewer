import { useField } from 'formik';
import React, { useState } from 'react';
type TInput = {
  label: string;
  placeholder: string;
  id: string;
  type: 'text' | 'email';
  name: string;
};

export const Input: React.FC<TInput> = ({
  label,
  placeholder,
  id,
  type,
  ...props
}) => {
  const [inputFocus, setInputFocus] = useState<boolean>();
  const [field, meta] = useField(props);

  return (
    <div
      className={`flex flex-col h-full relative items-start ${meta.touched && meta.error ? 'mb-0' : 'mb-2'}`}
    >
      <label
        htmlFor={id}
        className={`absolute text-sm z-1 bg-white dark:bg-neutral-900 ml-2 ${inputFocus ? 'text-gray-800 dark:text-amber-300 font-extrabold' : 'text-gray-500 dark:text-white'}`}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full xs:w-sm border outline-0 h-9 rounded-sm p-2 mt-2.5 relative"
        onFocus={() => setInputFocus(true)}
        onBlur={() => {
          setInputFocus(false);
        }}
      />
      {meta.touched && meta.error && (
        <div className="text-red-700 text-sm font-medium pt-1">
          {meta.error}
        </div>
      )}
    </div>
  );
};
