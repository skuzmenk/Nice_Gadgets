import { ArrowButton } from '@/components/molecules';
import styles from './CatalogPagination.module.scss';
import classNames from 'classnames';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const CatalogPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  return (
    <div className={classNames(styles.container, className)}>
      <ArrowButton
        direction="left"
        className={styles.page}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      />

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`${styles.page} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ),
      )}

      <ArrowButton
        direction="right"
        className={styles.page}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      />
    </div>
  );
};
