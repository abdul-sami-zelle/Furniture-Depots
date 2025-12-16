import { url } from '../../../utils/api';
import ProductArchive from './productArchive';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subcategorySlug = resolvedParams['product-archive'];

  try {
    const res = await fetch(
      `${url}/api/v1/productCategory/get-seo?slug=${subcategorySlug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: `${params.category} - Furniture Depots`,
        description: "Explore our products collection.",
      };
    }

    const { seoData } = await res.json();

    if (!seoData || seoData.length === 0) {
      return {
        title: `${params.category} - Furniture Depots`,
        description: "Explore our Categories collection.",
      };
    }

    const meta = seoData[0].meta;
    const slug = seoData[0].slug;

    const imageUrl = meta.og_image?.startsWith("http")
      ? meta.og_image
      : `https://fmapi.myfurnituremecca.com${meta.og_image.startsWith("/") ? meta.og_image : `/${meta.og_image}`}`;

    return {
      title: `${meta.title} - Furniture Depots` || `${seoData[0].name} - Furniture Depots`,
      description: meta.description || "Explore our category collection.",
      keywords: meta.keywords || undefined,
      alternates: {
        canonical: meta.canonical_url || `https://myfurnituremecca.com/${slug}`,
      },
      openGraph: {
        title: `${meta.og_title} - Furniture Depots` || meta.title,
        description: meta.og_description || meta.description,
        url: `https://myfurnituremecca.com/${slug}`,
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
        title: `${meta.x_title} - Furniture Depots` || meta.title,
        description: meta.x_description || meta.description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: "Category - Furniture Depots",
      description: "Explore our Category collection.",
    };
  }
}

export default function ProductArchivePage({ params }) {
  return <ProductArchive />;
}
