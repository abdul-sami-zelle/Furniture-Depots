import CareersClient from "@/UI/Components/CareerClient/CareerCient";

export async function generateMetadata() {
  return {
    title: "Career - Furniture Depots",
    description: "Career - Furniture Depots",
    openGraph: {
      title: "Career - Furniture Depots",
      description: "Career - Furniture Depots",
      url: "https://myfurnituremecca.com/careers",
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
  
  export default function Careers({ params }) {
    return <CareersClient params={params} />
  }