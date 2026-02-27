import ContactClient from "@/UI/Components/ContactClient/ContactClient";

export async function generateMetadata() {
  return {
    title: "Contact Us - Furniture Depots",
    description: "Contact Us - Furniture Depots",
    openGraph: {
      title: "Contact Us - Furniture Depots",
      description: "Contact Us - Furniture Depots",
      url: "https://thefurnituredepots.com/contact-us",
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

export default function Contact() {
    return <ContactClient />
}