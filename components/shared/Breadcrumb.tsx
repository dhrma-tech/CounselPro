import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  // Ensure the breadcrumb always starts with Home, but doesn't duplicate it
  const breadcrumbItems = items[0]?.label.toLowerCase() === 'home' 
    ? items 
    : [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 font-ui">
      {breadcrumbItems.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.href && index < breadcrumbItems.length - 1 ? (
            <Link href={item.href} className="hover:text-brand-blue transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={index === breadcrumbItems.length - 1 ? "text-text-primary font-medium" : ""}>
              {item.label}
            </span>
          )}
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-3 h-3 text-text-muted/40" />
          )}
        </span>
      ))}
    </nav>
  );
}
