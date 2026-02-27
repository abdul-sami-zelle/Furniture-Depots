import TermsAndConditionsClient from "@/UI/Components/TermsAndConditionsClient/TermsAndConditionsClient";

export async function generateMetadata() {
  return {
    title: "Terms & Conditions - Furniture Depots",
    description: "Terms & Conditions - Furniture Depots",
    openGraph: {
      title: "Terms & Conditions - Furniture Depots",
      description: "Terms & Conditions - Furniture Depots",
      url: "https://thefurnituredepots.com/terms-and-conditions",
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

export default function TermsAndConditions() {
  return <TermsAndConditionsClient />
}