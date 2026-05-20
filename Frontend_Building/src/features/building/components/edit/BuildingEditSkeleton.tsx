// src/features/building/components/edit/BuildingEditSkeleton.tsx

export const BuildingEditSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-32 bg-gray-200 rounded-xl"></div>
      
      {/* Thumbnail skeleton */}
      <div className="h-80 bg-gray-200 rounded-xl"></div>
      
      {/* Sections skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};