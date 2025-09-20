import { groq } from "next-sanity";
import { Service } from "../../../typings";
import { client } from "../lib/client";

export async function getServices(): Promise<Service[]> {
  const query = groq`*[_type == "service"]{
    _id,
    title,
    description,
    icon
  }`;
  return client.fetch<Service[]>(query);
}
