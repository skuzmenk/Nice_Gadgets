import styles from './CartTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';

import type { Data } from './CartTemplate.types';
import { Breadcrumbs, CartContent } from '@/components/organisms';
import { BackButton } from '@/components/organisms/BackButton/BackButton';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/router';

export const CartTemplate = ({ data }: { data: Data }) => {
  const { cartContent } = data;
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[{ label: t('cart') }]}
        className={styles.breadcrumbs}
      />
      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        {t('back')}
      </BackButton>
      <Typography
        variant="h1"
        className={styles.cart}
      >
        {t('cart')}
      </Typography>
      <Link
        to={ROUTES.HISTORY}
        className={styles.historyButton}
      >
        {t('cartHistory')}
      </Link>

      <CartContent data={cartContent} />
    </div>
  );
};
