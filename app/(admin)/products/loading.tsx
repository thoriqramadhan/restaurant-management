import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section className="w-full h-screen space-y-3">
      <Skeleton className="w-[100px] h-[28px] rounded-none" />
      <div className="flex space-x-3">
        <Skeleton className="w-[400px] h-[28px] rounded-none" />
        <Skeleton className="w-[50px] h-[28px] rounded-none" />
      </div>
      <div className="w-full mt-10 grid grid-cols-1 place-content-center md:grid-cols-3 lg:grid-cols-5 gap-5">
        {
            Array.from({length:6}).map((_ , i) => (
                <Skeleton className="w-[225px] h-[230px]" key={i}/>
            ))
        }
      </div>
    </section>
  );
}
