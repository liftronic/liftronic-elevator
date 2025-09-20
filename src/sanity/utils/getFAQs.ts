import { groq } from "next-sanity";
import { FAQ } from "../../../typings";
import { client } from "../lib/client";

export async function getFAQs(): Promise<FAQ[]> {
  const query = groq`*[_type == "faq"]{
    _id,
    question,
    answer
  }`;
  return client.fetch<FAQ[]>(query);
}
