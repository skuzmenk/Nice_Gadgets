import { useEffect, useState } from 'react';
import { useProducts } from '@/entities/product/model/product.queries';
import type { Order } from '@/shared/types/Order';
import styles from './OrderHistoryPage.module.scss';
import { BackButton } from '@/components/organisms/BackButton/BackButton';
import { useTranslation } from 'react-i18next';

export const OrderHistoryPage = () => {
  const { t } = useTranslation();

  const [orders, setOrders] = useState<Order[]>([]);
  const { data: products = [] } = useProducts();

  useEffect(() => {
    document.title = `${t('orderHistoryTitle')} | NICE GADGETS`;
  }, [t]);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orderHistory');

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders(savedOrders ? (JSON.parse(savedOrders) as Order[]) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{t('orderHistoryTitle')}</h1>

      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        {t('back')}
      </BackButton>

      {orders.length === 0 ?
        <p className={styles.empty}>{t('orderHistoryEmpty')}</p>
      : <div className={styles.list}>
          {orders.map((order) => (
            <article
              key={order.id}
              className={styles.order}
            >
              <div className={styles.section}>
                <h2>{t('orderHistoryProducts')}</h2>

                {order.products.map((item, index) => {
                  const product = products.find(
                    (product) => product.id === item.productId,
                  );

                  return (
                    <p key={`${item.productId}-${index}`}>
                      {product?.name ??
                        t('orderHistoryProductFallback', {
                          id: item.productId,
                        })}{' '}
                      × {item.quantity}
                    </p>
                  );
                })}
              </div>

              <div className={styles.section}>
                <h2>{t('orderHistoryTotalQuantity')}</h2>
                <p>
                  {order.products.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </p>
              </div>

              <div className={styles.section}>
                <h2>TTN</h2>
                <p>{order.ttn}</p>
              </div>
            </article>
          ))}
        </div>
      }
    </main>
  );
};
