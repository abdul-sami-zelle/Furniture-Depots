import { Suspense } from "react";
import ProductArchive from "../[category]/[product-archive]/page";

export async function generateMetadata() {
    return {
        title: `Searched Products - Furniture Depots`,
        description: `Browse our Furniture Depots collection`,
    };
}

export default function ActiveCategoryPage() {
    return (
        <Suspense>
            <ProductArchive productArchiveHading={`Search Result for:`} />  
        </Suspense>
    )
}