import { useField } from 'formik';
import React, { useState } from 'react';

type TSelectField = {
  cities: { nome: string; id: number; estado: string }[];
  label: string;
  name: string;
  id: string;
  FirstValue: string;
};

type TCity = {
  nome: string;
  id: number;
  estado: string;
};
export const SelectField: React.FC<TSelectField> = ({
  cities,
  label,
  id,
  FirstValue,
  ...props
}) => {
  const [focus, setFocus] = useState<string>('');
  const [field, meta] = useField(props);

  return (
    <div className="pb-2">
      <label
        htmlFor={id}
        className={`${focus != '' ? 'font-extrabold dark:text-amber-300 text-gray-800' : 'text-gray-500 dark:text-white'}  text-sm absolute bg-white ml-2 dark:bg-neutral-900`}
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        id={id}
        className={`${meta.value == 'Selecionar' && 'text-gray-400 border-black dark:border-white'} w-sm border py-2 px-1.5 h-9 rounded-sm outline-none mt-2.5 dark:bg-neutral-900`}
        onFocus={(e) => setFocus(e.target.value)}
        onBlur={() => setFocus('')}
      >
        <option className="text-gray-400" value={FirstValue}>
          {FirstValue}
        </option>
        {cities?.map((city: TCity) => {
          return (
            <option
              className="text-black dark:text-white "
              value={city.nome}
              key={city.id}
            >
              {city.nome}
            </option>
          );
        })}
      </select>
      <div className="text-red-700 text-sm font-medium pt-1">
        {meta.touched && meta.error ? meta.error : ''}
      </div>
    </div>
  );
};
