
import { useTranslation } from "react-i18next";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than or equal to max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust to show at least 3 middle pages if possible
      if (endPage - startPage < 2) {
        if (startPage === 2) {
          endPage = Math.min(4, totalPages - 1);
        } else if (endPage === totalPages - 1) {
          startPage = Math.max(2, totalPages - 3);
        }
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // Use -1 to represent ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // Use -2 to represent ellipsis
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          >
            {t("common.pagination.previous")}
          </PaginationPrevious>
        </PaginationItem>

        {getPageNumbers().map((pageNum, index) => (
          pageNum < 0 ? (
            <PaginationItem key={`ellipsis-${pageNum}-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                className={`cursor-pointer ${currentPage === pageNum ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          >
            {t("common.pagination.next")}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
