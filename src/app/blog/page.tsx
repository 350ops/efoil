import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { baseURL, blog, person, newsletter } from "@/resources";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: blog.title,
      description: blog.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
      path: blog.path,
    }),
    alternates: { canonical: "/blog" },
  };
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <Heading marginBottom="8" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Text variant="body-default-l" onBackground="neutral-weak" marginLeft="24" marginBottom="l">
        {blog.description}
      </Text>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
      </Column>
    </Column>
  );
}
