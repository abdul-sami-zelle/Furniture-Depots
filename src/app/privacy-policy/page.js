import PrivacyPolicyClient from '@/UI/Components/PrivacyPolicyClient/PrivacyPolicyClient';

export async function generateMetadata() {
  return {
    title: "Privacy Policy - Furniture Depots",
    description: "Privacy Policy - Furniture Depots",
    openGraph: {
      title: "Privacy Policy - Furniture Depots",
      description: "Privacy Policy - Furniture Depots",
      url: "https://myfurnituremecca.com/privacy-policy",
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

const PrivacyPolicy = () => {
  return <PrivacyPolicyClient />
}

export default PrivacyPolicy;