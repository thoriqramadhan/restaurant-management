"use client";
import { CategoryProductList } from "@/types/database";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function Accordion({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full bg-white rounded-xl border py-3 h-fit mt-5 overflow-hidden text-black",
        className
      )}
    >
      {/* accordion item */}
      {children}
    </div>
  );
}

interface AccordionItemProps {
  categoryName: string;
  productlists: CategoryProductList;
}
export function AccordionItem({
  categoryName,
  productlists,
}: AccordionItemProps) {
  const [accordionState, setAccordionState] = useState(false);
  function handleAccordion() {
    if (productlists.length > 0 && productlists[0] == null) {
      return;
    }

    setAccordionState((prev) => !prev);
  }
  return (
    <div
      className="w-full min-h-[50px] max-h-fit border-b-2 cursor-pointer px-2 pt-2"
      onClick={() => handleAccordion()}
    >
      <div className="w-full flex justify-between items-center mb-2">
        <p className="text-lg tracking-wider font-semibold capitalize">
          {categoryName}
        </p>
        {!(productlists.length > 0 && productlists[0] == null) && (
          <ChevronDown className={cn(accordionState && "rotate-180")} />
        )}
      </div>
      {/* content */}
      <section
        className={cn(
          "w-full space-y-1 border-t-1",
          !accordionState &&
            productlists.length > 0 &&
            productlists[0] !== null &&
            "hidden"
        )}
      >
        {productlists.length > 0 &&
          productlists[0] !== null &&
          productlists.map((item, index) => (
            <div
              className="w-full cursor-pointer py-2 transition-300 hover:bg-slate-500/20 rounded-md select-none"
              onClick={(e) => e.stopPropagation()}
              key={index}
            >
              <p className="tracking-widest p-2 capitalize">{item}</p>
            </div>
          ))}
      </section>
    </div>
  );
}
