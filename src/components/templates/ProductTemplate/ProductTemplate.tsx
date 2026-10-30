import styles from './ProductTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';

import {
  Breadcrumbs,
  CommentsSection,
  ProductPurchase,
  ProductRating,
  ProductSlider,
} from '@/components/organisms';

import { ProductSection } from '@/components/organisms/Product/ProductSection';
import { ProductDescription } from '@/components/organisms/Product/ProductDescription';
import { ProductSpecs } from '@/components/organisms/Product/ProductSpecs';

import type { AnyProductDetails, Product } from '@/shared/types';
import { getProductSpecs } from '@/entities/product/lib/getProductSpecs';
import type {
  WithImageUrls,
  With360ImageUrls,
} from '@/shared/types/WithImageUrls';
import { BackButton } from '@/components/organisms/BackButton/BackButton';
import { YouMayAlsoLike } from '@/components/organisms/YouMayAlsoLike';
import { useTranslation } from 'react-i18next';

import ukDescriptions from '@/shared/i18n/product-descriptions-uk.json';

type Props = {
  product: WithImageUrls<Product>;
  productDetails: With360ImageUrls<AnyProductDetails>;
};

export const ProductTemplate = ({ product, productDetails }: Props) => {
  const { t, i18n } = useTranslation();

  const specs = getProductSpecs(productDetails, t);

  const ukrainianDescription = ukDescriptions.find(
    (item) =>
      item.category === product.category && item.id === productDetails.id,
  );

  const description =
    i18n.language.startsWith('uk') && ukrainianDescription ?
      ukrainianDescription.description.map((item) => ({
        title: item.title,
        text: item.text.join(' '),
      }))
    : productDetails.description;

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          {
            label: t(product.category),
            to: `/${product.category}`,
          },
          {
            label: product.name,
          },
        ]}
        className={styles.breadcrumbs}
      />

      <BackButton
        className={styles.backButton}
        fallback={`/${product.category}`}
      >
        {t('back')}
      </BackButton>

      <div className={styles.titleRow}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {product.name}
        </Typography>
        <ProductRating namespaceId={productDetails.namespace_id} />
      </div>

      <div className={styles.info}>
        <ProductSlider
          key={productDetails.id}
          productId={product.id}
          images={productDetails.imageUrls}
          images360={productDetails.image360Urls ?? []}
          name={productDetails.name}
          className={styles.slider}
        />

        <span className={styles.separator} />

        <ProductPurchase
          product={product}
          productDetails={productDetails}
          className={styles.purchase}
        />
      </div>

      <ProductSection
        title={t('about')}
        className={styles.firstSection}
      >
        <ProductDescription description={description} />
      </ProductSection>

      <span className={styles.separator} />

      <ProductSection
        title={t('techSpecs')}
        className={styles.secondSection}
      >
        <ProductSpecs specs={specs} />
      </ProductSection>

      <CommentsSection
        key={productDetails.namespace_id}
        namespaceId={productDetails.namespace_id}
        category={product.category}
        productId={productDetails.id}

        className={styles.comments}
      />
      <YouMayAlsoLike
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};
