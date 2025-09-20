import { groq } from "next-sanity";
import { Client } from "../../../typings";
import { client } from "../lib/client";

export async function getClients(): Promise<Client[]> {
  const query = groq`*[_type == "client"]{
    _id,
    title,
    image{
      asset->{_id, url},
      alt
    }
  }`;
  return client.fetch<Client[]>(query);
}
