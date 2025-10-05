"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { Certificate } from "~/sanity/lib/certificateTypes";

interface CertificatesSectionProps {
  certificates?: Certificate[];
}

// Fallback certificate data
const defaultCertificates: Certificate[] = [
  {
    _id: "1",
    _type: "certificate",
    title: "Certificate of Appreciation",
    issuer: "MASSAED",
    issueDate: "2022",
    certificateImage: "/certificates/massaed-certificate.jpg",
    description: "In recognition and appreciation of the invaluable contribution to the success of the Project N-1777.",
    displayOrder: 0,
    isFeatured: true,
  },
  {
    _id: "2",
    _type: "certificate",
    title: "Recommendation Letter",
    issuer: "Wintech Elevators Tanzania Ltd.",
    issueDate: "October 27, 2022",
    certificateImage: "/certificates/wintech-recommendation.jpg",
    description: "Reference letter expressing satisfaction with the quality of product supplied.",
    displayOrder: 1,
    isFeatured: true,
  },
];

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 overflow-hidden">
          {/* Certificate Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
            <Image
              src={certificate.certificateImage}
              alt={certificate.imageAlt || certificate.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="text-white font-semibold text-sm">Click to view</span>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
              {certificate.title}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">{certificate.issuer}</span>
              <span className="text-gray-500">{certificate.issueDate}</span>
            </div>
            {certificate.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{certificate.description}</p>
            )}
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>

      {/* Modal for full-size view */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white hover:text-gray-900 transition-all shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Certificate details */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{certificate.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">{certificate.issuer}</span>
                  <span>•</span>
                  <span>{certificate.issueDate}</span>
                </div>
                {certificate.description && (
                  <p className="mt-3 text-gray-700">{certificate.description}</p>
                )}
              </div>

              {/* Full certificate image */}
              <div className="relative bg-gray-50 overflow-auto max-h-[calc(90vh-180px)]">
                <div className="relative min-h-[400px] w-full">
                  <Image
                    src={certificate.certificateImage}
                    alt={certificate.imageAlt || certificate.title}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const displayCertificates = certificates || defaultCertificates;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-white">
      {/* Background decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Clients Testimony
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Certifying Excellence: Liftronic Elevator&apos;s Quality Assurance Accreditation.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayCertificates.map((certificate) => (
            <CertificateCard key={certificate._id} certificate={certificate} />
          ))}
        </div>

        {/* Optional CTA or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Trusted by leading organizations across multiple industries
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Industry Recognized</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
