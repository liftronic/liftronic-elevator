# Certificates Directory

Place your certificate images in this directory.

## Expected Files:
- `massaed-certificate.jpg` - MASSAED Certificate of Appreciation
- `wintech-recommendation.jpg` - Wintech Elevators Tanzania Recommendation Letter

## Image Guidelines:
- Format: JPG, PNG, or WebP
- Recommended size: 1200x900px (4:3 aspect ratio)
- Maximum file size: 2MB for optimal loading
- Use descriptive filenames

## Adding More Certificates:
To add more certificates, update the `defaultCertificates` array in:
`/src/components/aboutus/CertificatesSection.tsx`

Example:
```typescript
{
  id: "3",
  title: "Your Certificate Title",
  issuer: "Issuing Organization",
  date: "Month Year",
  imageUrl: "/certificates/your-certificate.jpg",
  description: "Brief description of the certificate",
}
```
