import FinancingClient from "@/UI/Components/FinancingClient/FinancingClient";

export async function generateMetadata() {
  return {
    title: "Financing - Furniture Depots",
    description: "Financing - Furniture Depots",
    openGraph: {
      title: "Financing - Furniture Depots",
      description: "Financing - Furniture Depots",
      url: "https://myfurnituremecca.com/financing",
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

export default function Category() {
  return <FinancingClient />
}