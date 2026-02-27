import WishListClient from "@/UI/Components/WishListClient/WishListClient";

export async function generateMetadata() {
  return {
    title: "Wishlist - Furniture Depots",
    description: "Wishlist - Furniture Depots",
    openGraph: {
      title: "Wishlist - Furniture Depots",
      description: "Wishlist - Furniture Depots",
      url: "https://thefurnituredepots.com/wishlist",
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

export default function LoginRegister() {
  return <WishListClient />
}