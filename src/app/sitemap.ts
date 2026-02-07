import type { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString().split("T")[0];

  // Priority and change frequency maps for SEO
  const priorityMap: Record<string, number> = {
    "/": 1.0,
    "/work": 0.9,
    "/yachts": 0.85,
    "/resorts": 0.85,
    "/partners": 0.8,
    "/blog": 0.75,
    "/about": 0.7,
    "/gallery": 0.6,
  };

  const changeFreqMap: Record<string, "weekly" | "monthly"> = {
    "/": "weekly",
    "/blog": "weekly",
    "/work": "monthly",
    "/yachts": "monthly",
    "/resorts": "monthly",
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
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    : [];

  // Work/project pages
  const works: MetadataRoute.Sitemap = routesConfig["/work"]
    ? getPosts(["src", "app", "work", "projects"]).map((post) => ({
        url: `${baseURL}/work/${post.slug}`,
        lastModified: post.metadata.publishedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      }))
    : [];

  // Additional pages not in routes config (not in nav but important for SEO)
  const additionalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseURL}/what-is-efoiling`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...additionalPages, ...works, ...blogs];
}
