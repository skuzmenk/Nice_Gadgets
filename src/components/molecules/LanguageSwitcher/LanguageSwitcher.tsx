import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isUkrainian = i18n.resolvedLanguage === 'uk';

  const toggleLanguage = () => {
    const nextLanguage = isUkrainian ? 'en' : 'uk';

    localStorage.setItem('language', nextLanguage);
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={toggleLanguage}
      aria-label={
        isUkrainian ?
          'Switch language to English'
        : 'Switch language to Ukrainian'
      }
    >
      <span
        className={cn(styles.thumb, {
          [styles.ukrainian]: isUkrainian,
        })}
      >
        {isUkrainian ? 'UA' : 'EN'}
      </span>
    </button>
  );
};
