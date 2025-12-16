import LoginRegisterClient from "@/UI/Components/LoginRegisterClient/LoginRegisterClient";

export async function generateMetadata() {
  return {
    title: "Login & Register - Furniture Depots",
    description: "Login & Register - Furniture Depots",
    openGraph: {
      title: "Login & Register - Furniture Depots",
      description: "Login & Register - Furniture Depots",
      url: "https://myfurnituremecca.com/my-account",
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
  return <LoginRegisterClient />
}