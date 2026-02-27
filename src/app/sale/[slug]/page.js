import SaleClient from "@/UI/Components/SaleClient/SaleClient";


export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `https://fdapi.thefurnituredepots.com/api/v1/productCategory/get-seo?slug=${params.slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: `${params.name} - Furniture Depots`,
        description: "Browse our collection of quality furniture.",
      };
    }

    const { seoData } = await res.json();

    if (!seoData || seoData.length === 0) {
      return {
        title: `${params.name} - Furniture Depots`,
        description: "Browse our collection of quality furniture.",
      };
    }

    if (seoData || seoData.length > 0) {
      return {
        title: `${seoData[0].name} - Furniture Depots`,
        description: "Browse our collection of quality furniture.",
      };
    }

    const meta = seoData[0].meta;
    const slug = seoData[0].slug;

    const imageUrl = meta.og_image?.startsWith("http")
      ? meta.og_image
      : `https://fdapi.thefurnituredepots.com${meta.og_image.startsWith("/") ? meta.og_image : `/${meta.og_image}`}`;

    return {
      title: `${meta.title}` || `${seoData[0].name} - Furniture Depots`,
      description: meta.description || "Browse our collection of quality furniture.",
      keywords: meta.keywords || undefined,
      alternates: {
        canonical: meta.canonical_url || `https://thefurnituredepots.com/${slug}`,
      },
      openGraph: {
        title: `${meta.og_title} - Furniture Depots` || meta.title,
        description: meta.og_description || meta.description,
        url: `https://thefurnituredepots.com/${slug}`,
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
    console.log("Error fetching SEO data:");
    return {
      title: `${params.slug} - Furniture Depots`,
      description: "Browse our collection of quality furniture.",
    };
  }
}

export default function ActiveCategoryPage({ params }) {
  return <SaleClient slug={params} />
}
