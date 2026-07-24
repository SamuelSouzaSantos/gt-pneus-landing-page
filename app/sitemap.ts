import type { MetadataRoute } from "next";
import { ALL_SERVICES } from "@/constants/data";

const SITE_URL = "https://gtpneuserodas.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/servicos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...ALL_SERVICES.map((service) => ({
      url: `${SITE_URL}/servicos/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
