import classNames from 'classnames';
import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'radix-ui';
import { SearchIcon } from '@/components/atoms/Icons/SearchIcon';
import { CloseIcon } from '@/components/atoms/Icons/CloseIcon';
import { useProducts } from '@/entities/product';
import { routePaths } from '@/app/router/routes';
import styles from './SearchField.module.scss';
import { ImageWithFallback } from '../ImageWithFallback';

type Props = Omit<React.ComponentProps<'input'>, 'className' | 'type'> & {
  className?: string;
  onClear?: () => void;
};

export const SearchField = ({
  className,
  value,
  defaultValue,
  onChange,
  onFocus,
  onClear,
  ...inputProps
}: Props) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverId = useId();
  const currentValue = String(value ?? internalValue);
  const query = currentValue.trim();
  const shouldOpen = isOpen && query.length > 0;
  const { data: products, isPending, isError } = useProducts();
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ');
  const queryTerms = normalizedQuery.split(' ').filter(Boolean);
  const nameMatches =
    products?.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery),
    ) ?? [];
  const matchingProducts =
    nameMatches.length > 0 ?
      nameMatches
    : (products?.filter((product) => {
        const searchableParameters = [
          product.item_id,
          product.capacity,
          product.color,
          product.category,
        ]
          .join(' ')
          .toLowerCase();

        return queryTerms.every((term) => searchableParameters.includes(term));
      }) ?? []);

  return (
    <Popover.Root
      open={shouldOpen}
      onOpenChange={setIsOpen}
    >
      <Popover.Anchor asChild>
        <div className={classNames(styles.container, className)}>
          <SearchIcon className={styles.icon} />
          <input
            {...inputProps}
            ref={inputRef}
            className={styles.input}
            type="search"
            value={value ?? internalValue}
            aria-label={inputProps['aria-label'] ?? 'Search products'}
            aria-expanded={shouldOpen}
            aria-controls={popoverId}
            onFocus={(event) => {
              onFocus?.(event);
              if (query) setIsOpen(true);
            }}
            onChange={(event) => {
              if (value === undefined) {
                setInternalValue(event.target.value);
              }

              onChange?.(event);
              setIsOpen(Boolean(event.target.value.trim()));
            }}
          />
          <button
            className={classNames(styles.clearButton, {
              [styles.clearButtonHidden]: currentValue.length === 0,
            })}
            type="button"
            aria-label="Clear product search"
            aria-hidden={currentValue.length === 0}
            tabIndex={currentValue.length === 0 ? -1 : undefined}
            disabled={currentValue.length === 0}
            onClick={() => {
              if (value === undefined) {
                setInternalValue('');
              }

              onClear?.();
              setIsOpen(false);
              inputRef.current?.focus();
            }}
          >
            <CloseIcon className={styles.clearIcon} />
          </button>
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          id={popoverId}
          className={styles.results}
          align="start"
          side="bottom"
          sideOffset={8}
          collisionPadding={8}
          style={{
            width:
              'min(var(--radix-popover-trigger-width), calc(100vw - 16px))',
            maxWidth: 'calc(100vw - 16px)',
            boxSizing: 'border-box',
          }}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          {isPending ?
            <p className={styles.message}>Loading products...</p>
          : isError ?
            <p
              className={styles.message}
              role="alert"
            >
              Loading error
            </p>
          : matchingProducts.length === 0 ?
            <p className={styles.message}>Not found</p>
          : matchingProducts.map((product) => (
              <Link
                key={product.id}
                className={styles.result}
                to={routePaths.product(product.category, product.item_id)}
                onClick={() => setIsOpen(false)}
              >
                <ImageWithFallback
                  className={styles.productImage}
                  src={
                    product.imageUrls?.[0] ??
                    product.images[0] ??
                    'https://placehold.co/96x96'
                  }
                  alt=""
                />
                <span className={styles.productInfo}>
                  <span className={styles.productName}>{product.name}</span>
                  <span className={styles.productDetails}>
                    {[product.capacity, product.color]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                  <span className={styles.productPrice}>${product.price}</span>
                </span>
              </Link>
            ))
          }
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
