/* eslint-disable react/prop-types */
type TSearchInput = {
  value: string;
  onChangeLogic: (e: string) => void;
  placeholder: 'Pesquise alguma cidade aqui' | 'Pesquise alguma pessoa aqui';
  focus: React.Ref<HTMLInputElement>;
};
export const SearchInput: React.FC<TSearchInput> = ({
  value,
  onChangeLogic,
  placeholder,
  focus,
}) => {
  return (
    <div className="w-full h-10">
      <input
        ref={focus}
        value={value}
        placeholder={placeholder}
        type="search"
        className="focus:border-2 focus:border-amber-400 w-full p-2 bg-slate-100 dark:bg-neutral-700 border dark:border-white border-slate-500  rounded-md h-full outline-0 md:w-lg
      dark:placeholder:text-gray-300 placeholder:text-gray-500"
        onChange={(e) => {
          onChangeLogic(e.target.value.trimStart());
        }}
      />
    </div>
  );
};
