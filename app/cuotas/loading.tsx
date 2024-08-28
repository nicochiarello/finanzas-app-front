export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-300 h-8 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-8 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-8 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-8 w-full rounded-lg"></div>
      </div>
      <div className="animate-pulse flex flex-col gap-4">
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
        <div className="bg-gray-300 h-16 w-full rounded-lg"></div>
      </div>
    </div>
  );
}
