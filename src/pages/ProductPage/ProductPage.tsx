import { useParams } from 'react-router-dom';

import { ProductTemplate } from '@/components/templates';

import {
  useProduct,
  useProductByIdInCategory,
} from '@/entities/product/model/product.queries';

import type { Category } from '@/shared/types/Category';
import { NotFoundProductPage } from '../NotFoundProductPage';
import { ProductLoadingSkeleton } from '@/components';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ProductPage = () => {
  const { t } = useTranslation();

  const { productSlug } = useParams<'productSlug'>();

  const {
    data: product,
    isPending: isProductPending,
    isError: isProductError,
  } = useProduct(productSlug ?? '');

  const {
    data: productDetails,
    isPending: isDetailsPending,
    isError: isDetailsError,
  } = useProductByIdInCategory(
    product?.category as Category | undefined,
    product?.item_id,
  );

  useEffect(() => {
    document.title = `${productDetails?.name || t('loading')} | NICE GADGETS`;
  }, [productDetails, t]);

  if (isProductPending) return <ProductLoadingSkeleton />;
  if (!product || isProductError) return <NotFoundProductPage />;

  if (isDetailsPending) return <ProductLoadingSkeleton />;
  if (!productDetails || isDetailsError) return <NotFoundProductPage />;

  return (
    <ProductTemplate
      product={product}
      productDetails={productDetails}
    />
  );
};
