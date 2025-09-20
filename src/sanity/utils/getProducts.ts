import { groq } from "next-sanity";
import { Product } from "../../../typings";
import { client } from "../lib/client";

export async function getProducts(): Promise<Product[]> {
  const query = groq`*[_type == "product"]{
    _id,
    title,
    subtitle,
    description,
    tags[]->{
      _id,
      title,
      slug
    },
    faqs[]->{
      _id,
      question,
      answer
    },
    keyFeatures[]->{
      _id,
      title,
      description,
      icon
    },
    specifications[]{
      label,
      value
    }
  }`;
  return client.fetch<Product[]>(query);
}
