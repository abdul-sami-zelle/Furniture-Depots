import AboutUsClient from "@/UI/Components/AboutusClient/AboutusClient";

export async function generateMetadata() {
  return {
    title: "About Us - Furniture Depots",
    description: "About Us - Furniture Depots",
    openGraph: {
      title: "About Us - Furniture Depots",
      description: "About Us - Furniture Depots",
      url: "https://myfurnituremecca.com/about-us",
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

export default function AboutUs() {
    
    return <AboutUsClient  />
}