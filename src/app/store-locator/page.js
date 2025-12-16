import StoreLocatorClient from "@/UI/Components/StoreLocatorClient/StoreLocatorClient";

export async function generateMetadata() {
  return {
    title: `Store Locator  - Furniture Depots`,
    description: `Browse our  collection`,
  };
}

export default function StoreLocator() {
  return <StoreLocatorClient />
}