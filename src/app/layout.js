import ClientLayout from "@/Global-Components/ClientLayout/ClientLayout";
import Script from "next/script";

export const metadata = {
  title: "The Furniture Depots",
  description:
    "Furniture Depots has the largest selection of quality furniture, mattresses and other stylish furnishings items for great prices.",
  openGraph: {
    title: " The Furniture Depots",
    description:
      "Furniture Depots has the largest selection of quality furniture, mattresses and other stylish furnishings items for great prices.",
    url: "",
    siteName: "The Furniture Depots",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "The Furniture Depots",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
