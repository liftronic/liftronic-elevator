import { groq } from "next-sanity";
import { Social } from "../../../typings";
import { client } from "../lib/client";

export async function getSocial(): Promise<Social[]> {
  const query = groq`*[_type == "social"]{
    _id,
    title,
    url,
    tags[]->{
      _id,
      title,
      slug
    }
  }`;
  return client.fetch<Social[]>(query);
}
