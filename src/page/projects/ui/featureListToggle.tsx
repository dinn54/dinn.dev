"use client";
import { B4F, Text } from "@/shared/ui/text/text";
import { useState } from "react";
import { Triangle } from "lucide-react";

const FeatureListToggle = ({ featureData }: { featureData: string[] }) => {
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  return (
    <>
      <button
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => setIsFeaturesVisible(!isFeaturesVisible)}
      >
        <Triangle className="rotate-90" size={16} />
        <Text>구현 리스트</Text>
      </button>
      {isFeaturesVisible && (
        <ul className="pc:space-y-1 list-inside list-none pl-6">
          {featureData.map((feature, index) => (
            <li key={index} className="space-x-2 pl-1">
              <B4F>•</B4F>
              <B4F>{feature}</B4F>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default FeatureListToggle;
