import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { socialsType } from "./socials";
import { tagsType } from "./tags";
import { performanceType } from "./servicePerformanceNumbers";
import { testimonialType } from "./testimonial";
import { clientType } from "./clients";
import { faqType } from "./faq";
import { keyFeatureType } from "./keyFeatures";
import { productType } from "./products";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    socialsType,
    tagsType,
    performanceType,
    testimonialType,
    clientType,
    faqType,
    keyFeatureType,
    productType,
  ],
};
