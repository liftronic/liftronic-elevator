// Certificate type definitions for Sanity CMS

export interface Certificate {
  _id: string;
  _type: "certificate";
  title: string;
  issuer: string;
  issueDate: string;
  certificateImage: string; // URL after processing with urlFor
  imageAlt?: string;
  description?: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface CertificateRaw {
  _id: string;
  _type: "certificate";
  title: string;
  issuer: string;
  issueDate: string;
  certificateImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  imageAlt?: string;
  description?: string;
  displayOrder: number;
  isFeatured: boolean;
}
