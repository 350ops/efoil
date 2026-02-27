import type { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString().split("T")[0];

  // Priority map — higher = stronger signal for Google to feature as sitelink
  const priorityMap: Record<string, number> = {
    "/": 1.0,
    "/efoil-experiences-maldives": 0.95,
    "/learn-efoil-maldives": 0.95,
    "/audi-foil-board": 0.9,
    "/yachts": 0.9,
    "/resorts": 0.9,
    "/efoil-rental-maldives": 0.85,
    "/blog": 0.85,
    "/events": 0.8,
    "/crew": 0.8,
    "/partners": 0.75,
    "/about": 0.7,
    "/gallery": 0.65,
  };

  // Change frequency — dynamic content signals freshness to crawlers
  const changeFreqMap: Record<string, "daily" | "weekly" | "monthly" | "yearly"> = {
    "/": "weekly",
    "/blog": "weekly",
    "/events": "weekly",
    "/efoil-experiences-maldives": "monthly",
    "/learn-efoil-maldives": "monthly",
    "/audi-foil-board": "monthly",
    "/yachts": "monthly",
    "/resorts": "monthly",
    "/efoil-rental-maldives": "monthly",
    "/crew": "monthly",
    "/partners": "monthly",
    "/about": "monthly",
    "/gallery": "monthly",
  };

  // Static routes from config (only include enabled routes)
  const staticRoutes: MetadataRoute.Sitemap = Object.entries(routesConfig)
    .filter(([, enabled]) => enabled)
    .map(([route]) => ({
      url: `${baseURL}${route === "/" ? "" : route}`,
      lastModified: now,
      changeFrequency: changeFreqMap[route] ?? "monthly",
      priority: priorityMap[route] ?? 0.5,
    }));

  // Blog posts (only if blog route is active)
  const blogs: MetadataRoute.Sitemap = routesConfig["/blog"]
    ? getPosts(["src", "app", "blog", "posts"]).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
        changeFrequency: "yearly",
        priority: 0.6,
      }))
    : [];

  // Additional pages not in the routes config
  const additionalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseURL}/booking/success`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [...staticRoutes, ...blogs, ...additionalPages];
}
