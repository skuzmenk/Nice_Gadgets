import { TextButton } from '@/components/molecules';
import styles from './AddToCartbutton.module.scss';
import { selectAddItem, selectIsInCart, useCartStore } from '@/entities/cart';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/app/router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { animateProductToHeader } from '@/shared/lib/animateProductToHeader';

type Props = {
  productId: number;
  className?: string;
};

export const AddToCartButton = ({ productId, className }: Props) => {
  const { t } = useTranslation();

  const addItem = useCartStore(selectAddItem);
  const isAdded = useCartStore(selectIsInCart(productId));
  const location = useLocation();

  const handleAddToCart = () => {
    animateProductToHeader(productId, 'cart');
    addItem(productId);
  };

  return (
    <TextButton
      className={classNames(styles.button, className)}
      selected={isAdded}
      onClick={isAdded ? () => {} : handleAddToCart}
    >
      {isAdded ?
        <Link
          to={ROUTES.CART}
          state={{ from: `${location.pathname}${location.search}` }}
        >
          {t('addedToCart')}
        </Link>
      : t('addToCart')}
    </TextButton>
  );
};
