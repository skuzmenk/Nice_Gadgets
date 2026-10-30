import type { ProductsSlidesData } from '@/components/organisms/Product/ProductsSlider';
import type { ShopByCategoryData } from '@/components/organisms/ShopByCategory';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

import { useProducts } from '@/entities/product/model/product.queries';
import { getBrandNewModels } from './lib/getBrandModels';
import { getHotPrices } from './lib/getHotPrices';
import { getHeroSliderData } from './lib/getHeroSliderData';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import backgroundPhonesCategory from '@/shared/assets/images/phones_background.png?no-inline';
import imagePhonesCategory from '@/shared/assets/images/phones_product.png?no-inline';

import backgroundTabletsCategory from '@/shared/assets/images/tablets_background.png?no-inline';
import imageTabletsCategory from '@/shared/assets/images/tablets_product.png?no-inline';

import backgroundAccessoriesCategory from '@/shared/assets/images/accessories_background.png?no-inline';
import imageAccessoriesCategory from '@/shared/assets/images/accessories_product.png?no-inline';

export const HomePage = () => {
  const { t } = useTranslation();

  const heroSliderData = getHeroSliderData(t);

  useEffect(() => {
    document.title = `${t('home')} | NICE GADGETS`;
  }, [t]);

  const { data: products = [], isPending } = useProducts();

  const phonesCount = products.filter(
    (product) => product.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    (product) => product.category === 'tablets',
  ).length;

  const accessoriesCount = products.filter(
    (product) => product.category === 'accessories',
  ).length;

  const shopByCategoryData: ShopByCategoryData = {
    sectionTitle: t('shopByCategory'),
    sectionSubtitle: t('exploreProducts'),
    categories: [
      {
        id: 'mobile-phones',
        title: t('mobilePhones'),
        count: phonesCount,
        link: 'phones',
        image: imagePhonesCategory,
        background: backgroundPhonesCategory,
      },
      {
        id: 'tablets',
        title: t('tablets'),
        count: tabletsCount,
        link: 'tablets',
        image: imageTabletsCategory,
        background: backgroundTabletsCategory,
      },
      {
        id: 'accessories',
        title: t('accessories'),
        count: accessoriesCount,
        link: 'accessories',
        image: imageAccessoriesCategory,
        background: backgroundAccessoriesCategory,
      },
    ],
  };

  const newModels = getBrandNewModels(products);
  const hotPrices = getHotPrices(products);

  const brandNewModelsData: ProductsSlidesData = {
    sectionTitle: t('brandNewModels'),
    sectionSubTitle: t('latestDevices'),
    productCards: newModels,
    isLoading: isPending,
  };

  const hotPricesData: ProductsSlidesData = {
    sectionTitle: t('hotPrices'),
    sectionSubTitle: t('betterPrices'),
    productCards: hotPrices,
    isLoading: isPending,
  };

  return (
    <HomeTemplate
      data={{
        heroSlider: heroSliderData,
        brandNewModels: brandNewModelsData,
        shopByCategory: shopByCategoryData,
        hotPrices: hotPricesData,
      }}
    />
  );
};
