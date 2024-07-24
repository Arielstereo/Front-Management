import { Skeleton } from "@nextui-org/react";

const SkeletonComponent = () => {
  return (
    <div className="mt-12 flex gap-12 mx-8">
      <Skeleton className="h-96 w-96 rounded-lg" />
    </div>
  );
};

export default SkeletonComponent;
