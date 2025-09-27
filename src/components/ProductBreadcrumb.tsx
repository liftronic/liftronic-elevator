import Link from "next/link";
import { HiChevronRight, HiHome } from "react-icons/hi";

type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
};

type ProductBreadcrumbProps = {
  productTitle?: string;
  items?: BreadcrumbItem[];
};

export default function ProductBreadcrumb({
  productTitle,
  items,
}: ProductBreadcrumbProps) {
  // Default breadcrumb structure for products
  const defaultItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", isCurrentPage: !productTitle },
  ];

  // If productTitle is provided, add it as the final item
  if (productTitle) {
    defaultItems.push({
      label: productTitle,
      isCurrentPage: true,
    });
  }

  // Use custom items if provided, otherwise use default
  const breadcrumbItems = items || defaultItems;

  return (
    <div>
      <div className="container">
        <nav
          className="flex items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-accent"
          >
            <HiHome className="h-4 w-4" />
            <span>Home</span>
          </Link>

          {breadcrumbItems.slice(1).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <HiChevronRight className="h-4 w-4 text-gray-400" />
              {item.href && !item.isCurrentPage ? (
                <Link
                  href={item.href}
                  className="font-medium text-gray-600 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`max-w-[200px] truncate ${
                    item.isCurrentPage
                      ? "font-semibold text-accent"
                      : "font-medium text-gray-600"
                  }`}
                  aria-current={item.isCurrentPage ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
