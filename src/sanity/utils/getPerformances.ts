import { groq } from "next-sanity";
import { client } from "../lib/client";
import { Performance } from "../../../typings";

export async function getPerformances(): Promise<Performance[]> {
  const query = groq`*[_type == "performance"]{
    _id,
    performanceTitle,
    performanceFigure,
    performancePic{
      asset->{_id, url},
      alt
    }
  }`;
  return client.fetch<Performance[]>(query);
}
