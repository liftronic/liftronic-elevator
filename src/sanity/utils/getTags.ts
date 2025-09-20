import { groq } from "next-sanity";
import { Tag } from "../../../typings";
import { client } from "../lib/client";

export async function getTags(): Promise<Tag[]> {
  const query = groq`*[_type == "tag"]{
    _id,
    title,
    slug
  }`;
  return client.fetch<Tag[]>(query);
}
