import { groq } from "next-sanity";
import { Post, Author, Category, BlockContent } from "../../../typings";
import { client } from "../lib/client";

export async function getPosts(): Promise<Post[]> {
  const query = groq`*[_type == "post"]{
    _id,
    _createdAt,
    title,
    slug,
    author->{_id, name, slug, image{asset->{_id,url}, alt}, bio},
    mainImage{asset->{_id,url}, alt},
    categories[]->{_id, title, slug, description},
    publishedAt,
    body
  }`;

  return client.fetch<Post[]>(query);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    slug,
    author->{_id, name, slug, image{asset->{_id,url}, alt}, bio},
    mainImage{asset->{_id,url}, alt},
    categories[]->{_id, title, slug, description},
    publishedAt,
    body
  }`;

  return client.fetch<Post | null>(query, { slug });
}
