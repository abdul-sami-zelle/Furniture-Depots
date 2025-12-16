import LastCallClient from "@/UI/Components/LastCallClient/LastCallClient";

export async function generateMetadata({ params }) {
    return {
        title: `Last Call - My Furniture Depots`,
        description: `Browse our ${params.sale} collection`,
    };
}

export default function LastCall({ params }) {
    return <LastCallClient slug={params} />
}
