import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
  Tag,
} from "@once-ui-system/core";
import { baseURL, about, blog, person, founder } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getReadingTime } from "@/utils/readingTime";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return {
    ...Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary,
      baseURL: baseURL,
      image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
      path: `${blog.path}/${post.slug}`,
    }),
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);
  const dateModified = post.metadata.updatedAt || post.metadata.publishedAt;

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={dateModified}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            author={{
              name: founder.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.metadata.title, href: `/blog/${post.slug}` },
            ]}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            {/* Date + reading time + tag — engagement & freshness signals */}
            <Row gap="12" vertical="center" wrap horizontal="center">
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">·</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {readingTime}
              </Text>
              {post.metadata.tag && (
                <>
                  <Text variant="body-default-xs" onBackground="neutral-weak">·</Text>
                  <Tag size="s">{post.metadata.tag}</Tag>
                </>
              )}
            </Row>
            {post.metadata.updatedAt && (
              <Text variant="body-default-xs" onBackground="brand-weak">
                Updated {formatDate(post.metadata.updatedAt)}
              </Text>
            )}
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
            {post.metadata.subtitle && (
              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                align="center"
                style={{ fontStyle: "italic" }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          {/* Author section — E-E-A-T signal */}
          <Row marginBottom="32" horizontal="center">
            <Column gap="8" horizontal="center" align="center">
              <Row gap="12" vertical="center">
                <Avatar size="s" src={person.avatar} />
                <Column gap="2">
                  <Text variant="label-default-m" onBackground="brand-weak">
                    {founder.name}
                  </Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {founder.role}
                  </Text>
                </Column>
              </Row>
            </Column>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>

          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}${blog.path}/${post.slug}`}
          />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
              Recent posts
            </Text>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
