/* eslint-disable react/prop-types */
type TSearchInput = {
  value: string;
  onChangeLogic: (e: string) => void;
};
export const SearchInput: React.FC<TSearchInput> = ({
  value,
  onChangeLogic,
}) => {
  return (
    <div className="w-full h-10">
      <input
        value={value}
        placeholder="Pesquise algum nome aqui"
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
