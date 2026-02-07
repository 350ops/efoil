import type { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString().split("T")[0];

  // Static routes from config (only include enabled routes)
  const staticRoutes: MetadataRoute.Sitemap = Object.entries(routesConfig)
    .filter(([, enabled]) => enabled)
    .map(([route]) => ({
      url: `${baseURL}${route === "/" ? "" : route}`,
      lastModified: now,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1.0 : route === "/work" ? 0.9 : 0.7,
    }));

  // Blog posts (only if blog route is active)
  const blogs: MetadataRoute.Sitemap = routesConfig["/blog"]
    ? getPosts(["src", "app", "blog", "posts"]).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
        changeFrequency: "yearly",
        priority: 0.5,
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

  // Additional pages not in the routes config
  const additionalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseURL}/booking/success`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...works, ...blogs, ...additionalPages];
}
