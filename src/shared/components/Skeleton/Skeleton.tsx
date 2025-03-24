export const Skeleton: React.FC = () => {
  return (
    <>
      <div className="w-36 h-10 dark:from-neutral-600 dark:to-gray-400 from-slate-200 to-gray-100 from-10% to-80% bg-gradient-to-bl animate-pulse rounded-md"></div>
      <div className="w-24 h-10 dark:from-neutral-600 dark:to-gray-400 from-slate-200 to-gray-100 from-10% to-80% bg-gradient-to-bl animate-pulse rounded-md"></div>
      <div className="w-44 h-10 dark:from-neutral-600 dark:to-gray-400 from-slate-200 to-gray-100 from-10% to-80% bg-gradient-to-bl animate-pulse rounded-md"></div>
      <div className="w-14 h-10 dark:from-neutral-600 dark:to-gray-400 from-slate-200 to-gray-100 from-10% to-80% bg-gradient-to-bl animate-pulse rounded-md"></div>
    </>
  );
};
