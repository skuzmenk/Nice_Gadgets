import styles from '@/components/templates/ProductTemplate/ProductTemplate.module.scss';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

export const ProductLoadingSkeleton = () => (
  <div
    className={styles.container}
    aria-busy="true"
    aria-label="Loading product"
  >
    <div className={classNames(styles.breadcrumbs)}>
      <Skeleton
        width={48}
        height={20}
      />
    </div>

    <div className={styles.backButton}>
      <Skeleton
        width={48}
        height={20}
      />
    </div>

    <div className={styles.title}>
      <Skeleton
        width="60%"
        height={36}
      />
    </div>

    <div className={styles.info}>
      <div className={styles.slider}>
        <Skeleton
          width="100%"
          count={1}
          height={288}
        />
      </div>

      <span className={styles.separator} />

      <div className={styles.purchase}>
        <Skeleton
          width="50%"
          height={28}
          style={{ marginBottom: 16 }}
        />
        <Skeleton
          width="35%"
          height={24}
          style={{ marginBottom: 16 }}
        />
        <Skeleton
          count={1}
          height={60}
        />
      </div>
    </div>

    <section className={styles.firstSection}>
      <Skeleton
        width="40%"
        height={28}
        style={{ marginBottom: 16 }}
      />
      <Skeleton
        count={1}
        height={30}
      />
    </section>
    <span className={styles.separator} />

    <section className={styles.secondSection}>
      <Skeleton
        width="45%"
        height={40}
        style={{ marginBottom: 16 }}
      />
      <Skeleton
        count={1}
        height={30}
      />
    </section>
  </div>
);
