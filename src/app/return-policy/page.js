import ReturnPolicyClient from "@/UI/Components/ReturnPolicyClient/ReturnPolicyClient";

export async function generateMetadata() {
  return {
    title: "Return Policy - Furniture Depots",
    description: "Return Policy - Furniture Depots",
    openGraph: {
      title: "Return Policy - Furniture Depots",
      description: "Return Policy - Furniture Depots",
      url: "https://myfurnituremecca.com/return-policy",
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

export default function ReturnPolicy() {
    return <ReturnPolicyClient />
}