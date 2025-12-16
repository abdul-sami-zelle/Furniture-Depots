import CategoriesClient from "@/UI/Components/CategoryClient/CategoryClient";
import { url } from "../../utils/api";

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const { category } = resolvedParams;

  try {
    const res = await fetch(
      `${url}/api/v1/productCategory/get-seo?slug=${category}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: `${category} - Furniture Depots`,
        description: "Browse our collection of quality furniture.",
      };
    }

    const { seoData } = await res.json();

    if (!seoData || seoData.length === 0) {
      return {
        title: `${category} - Furniture Depots`,
        description: "Browse our collection of quality furniture.",
      };
    }

    const meta = seoData[0].meta;
    const slug = seoData[0].slug;

    const imageUrl = meta.og_image?.startsWith("http")
      ? meta.og_image
      : `${url}${meta.og_image.startsWith("/") ? meta.og_image : `/${meta.og_image}`}`;

    return {
      title: `${meta.title} - Furniture Depots` || `${seoData[0].name} - Furniture Depots`,
      description: meta.description || "Browse our collection of quality furniture.",
      keywords: meta.keywords || undefined,
      alternates: {
        canonical: meta.canonical_url || `${url}/${slug}`,
      },
      openGraph: {
        title: `${meta.og_title} - Furniture Depots` || meta.title,
        description: meta.og_description || meta.description,
        url: `${url}/${slug}`,
        siteName: "Furniture Depots",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: seoData[0].name,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: meta.x_title || meta.title,
        description: meta.x_description || meta.description,
        images: [imageUrl], // ✅ Match OG image for consistency
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Category - Furniture Depots",
      description: "Browse our collection of quality furniture.",
    };
  }
}

export default async function Category({ params }) {
  const resolvedParam = await params;
  const {category} = resolvedParam

  return <CategoriesClient category={category} />
}



