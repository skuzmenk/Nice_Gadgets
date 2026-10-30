import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { HomeIcon } from '@/components/atoms/Icons/HomeIcon';
import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';
import classNames from 'classnames';
import React from 'react';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: Props) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={classNames(styles.breadcrumb, className)}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          classNames(styles.itemLink, {
            [styles.active]: isActive,
          })
        }
      >
        <HomeIcon className={styles.homeIcon} />
      </NavLink>

      {items.map(({ label, to }, index) => (
        <React.Fragment key={index}>
          <ArrowIcon direction="right" />

          {to ?
            <NavLink
              to={to}
              className={styles.itemLink}
            >
              {label}
            </NavLink>
          : <span className={classNames(styles.itemLink, styles.active)}>
              {label}
            </span>
          }
        </React.Fragment>
      ))}
    </div>
  );
};
