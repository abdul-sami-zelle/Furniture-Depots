import UserDashboardWrapper from "@/UI/Components/UserDashClient/UserDashboardWrapper";

export async function generateMetadata() {
  return {
    title: `User Dash - Furniture Depots`,
    description: `Browse our Furniture Depots collection`,
  };
}

export default async function UserDashboard({ params }) {
  const resolvedParam = await params
  return <UserDashboardWrapper id={resolvedParam.id} />
}