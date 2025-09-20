import { groq } from "next-sanity";
import { KeyFeature } from "../../../typings";
import { client } from "../lib/client";

export async function getKeyFeatures(): Promise<KeyFeature[]> {
  const query = groq`*[_type == "keyFeature"]{
    _id,
    title,
    description,
    icon
  }`;
  return client.fetch<KeyFeature[]>(query);
}
