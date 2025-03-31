/* eslint-disable react/prop-types */
type TGenericDrawerButton = {
  onClick: () => void;
  buttonText: string;
  icon: React.ReactNode;
};
export const GenericDrawerButton: React.FC<TGenericDrawerButton> = ({
  onClick,
  buttonText,
  icon,
}) => {
  return (
    <button
      type="button"
      className="border-b-0 border-l-0 border-r-0 gap-8 px-5 font-medium text-lg dark:text-white cursor-pointer flex items-center justify-start w-full py-3 border rounded-t-md border-gray-400"
      onClick={() => {
        onClick();
      }}
    >
      {icon}
      {buttonText}
    </button>
  );
};
