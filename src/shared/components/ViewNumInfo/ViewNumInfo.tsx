/* eslint-disable react/prop-types */
type TViewNumInfo = {
  textInfo: string;
  numInfo: number;
};
export const ViewNumInfo: React.FC<TViewNumInfo> = ({ textInfo, numInfo }) => {
  return (
    <div className="w-fit rounded-md border border-gray-400 px-5 h-48 text-8xl flex flex-col items-center justify-evenly">
      <h1 className="text-2xl text-center font-semibold">{textInfo}</h1>
      {numInfo}
    </div>
  );
};
