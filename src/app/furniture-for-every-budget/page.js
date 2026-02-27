import FurnitureAtEveryBudgetClient from "@/UI/Components/FurnitureForBudgetClient/FurnitureForBudgetClient";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Furniture For Every Budget - Furniture Depots",
    description: "Furniture For Every Budget - Furniture Depots",
    openGraph: {
      title: "Furniture For Every Budget - Furniture Depots",
      description: "Furniture For Every Budget - Furniture Depots",
      url: "https://thefurnituredepots.com/furniture-for-every-budget",
      images: [
        {
          url: "/favicon.png", // ✅ static fallback image
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default function FurnitureAtEveryBudget() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FurnitureAtEveryBudgetClient />
    </Suspense>
  )
}