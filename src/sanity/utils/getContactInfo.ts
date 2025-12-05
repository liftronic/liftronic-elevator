import { groq } from "next-sanity";
import { ContactInfo } from "../../../typings";
import { client } from "../lib/client";

export async function getContactInfo(): Promise<ContactInfo | null> {
  const query = groq`*[_type == "contactInfo"][0]{
    _id,
    supportPhone,
    supportPhoneLabel,
    email,
    emailLabel,
    salesPhone,
    salesPhoneLabel,
    mapEmbedUrl,
    addresses[]{
      _key,
      label,
      address
    },
    whatsappNumber,
    whatsappMessage,
    privacyPolicyUrl,
    termsOfServiceUrl
  }`;
  return client.fetch<ContactInfo | null>(query);
}
