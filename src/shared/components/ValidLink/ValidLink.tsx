/* eslint-disable react/prop-types */
export const ValidLink: React.FC<{
  whereTo: string;
  textLink: string;
  begin: 'Já' | 'Não';
}> = ({ whereTo, textLink, begin }) => {
  return (
    <div className="w-full flex items-end justify-end py-2">
      <p>
        {begin} tem conta?
        <a
          className="hover:text-blue-700 text-gray-500 underline hover:no-underline text-md font-semibold pt-0.5 pl-1"
          href={whereTo}
        >
          {textLink}
        </a>
      </p>
    </div>
  );
};
