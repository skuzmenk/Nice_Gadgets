import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { NotFoundPage } from '../NotFoundPage';

import { useProducts } from '@/entities/product/model/product.queries';
import { useProductRatings } from '@/entities/product/model/product-ratings.queries';

import { Category } from '@/shared/types/Category';

import { CATALOG_SORT_OPTIONS } from '@/components/organisms/CatalogFilter/CatalogFilter.constants';
import { CatalogTemplate } from '@/components/templates';
import { useTranslation } from 'react-i18next';
import { useTopSales } from '@/shared/api/topsales.queries';

export const CatalogPage = () => {
  const { t } = useTranslation();

  const { catalogSlug } = useParams<'catalogSlug'>();
  const [searchParams, setSearchParams] = useSearchParams();

  const title = catalogSlug || '';

  useEffect(() => {
    document.title = `${t(title)} | NICE GADGETS`;
  }, [title, t]);

  const { data: products, isPending, isError } = useProducts();

  const {
    data: ratings = [],
    isPending: isRatingsPending,
    isError: isRatingsError,
  } = useProductRatings();

  const {
    data: topSales = [],
    isPending: isTopSalesPending,
    isError: isTopSalesError,
  } = useTopSales();

  const isValidCategory = Object.values(Category).some(
    (category) => category === title,
  );

  const items = useMemo(() => {
    return (products ?? []).filter((item) => item.category === title);
  }, [products, title]);

  const ratingsMap = useMemo(() => {
    return new Map(ratings.map((item) => [item.namespaceId, item.rating]));
  }, [ratings]);

  const sortBy =
    CATALOG_SORT_OPTIONS.find(
      (option) => option === searchParams.get('sort'),
    ) ?? CATALOG_SORT_OPTIONS[0];

  const isRatingSort = sortBy === 'Highest rated' || sortBy === 'Lowest rated';

  const sortedItems = useMemo(() => {
    return [...items].sort((first, second) => {
      switch (sortBy) {
        case 'Cheapest':
          return first.price - second.price;

        case 'Most expensive':
          return second.price - first.price;

        case 'Newest':
          return second.year - first.year;
        case 'Top sales': {
          const firstSales =
            topSales.find((sale) => sale.product_id === first.id)?.quantity ??
            0;

          const secondSales =
            topSales.find((sale) => sale.product_id === second.id)?.quantity ??
            0;

          return secondSales - firstSales;
        }
        case 'Highest rated':
        case 'Lowest rated': {
          const firstRating = ratingsMap.get(first.namespace_id);
          const secondRating = ratingsMap.get(second.namespace_id);

          if (firstRating == null && secondRating == null) {
            return 0;
          }

          if (firstRating == null) {
            return 1;
          }

          if (secondRating == null) {
            return -1;
          }

          return sortBy === 'Highest rated' ?
              secondRating - firstRating
            : firstRating - secondRating;
        }

        default:
          return 0;
      }
    });
  }, [items, sortBy, ratingsMap, topSales]);

  const itemsPerPage = Number(searchParams.get('perPage')) || 16;

  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const visibleItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));

    setSearchParams(params);
  };

  if (!isValidCategory) {
    return <NotFoundPage />;
  }

  if (isError) {
    return <h2>Product error</h2>;
  }

  if (isRatingSort && isRatingsError) {
    return <h2>Failed to load product ratings</h2>;
  }

  if (sortBy === 'Top sales' && isTopSalesError) {
    return <h2>Failed to load top sales</h2>;
  }

  return (
    <CatalogTemplate
      data={{
        items: visibleItems,
        totalItems: items.length,
        title,
        isLoading:
          isPending ||
          (isRatingSort && isRatingsPending) ||
          (sortBy === 'Top sales' && isTopSalesPending),
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};
