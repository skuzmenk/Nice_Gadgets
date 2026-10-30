import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

import pageNotFoundImage from '/img/page-not-found.png';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('pageNotFound')} | NICE GADGETS`;
  }, [t]);

  return (
    <NotFoundTemplate
      title={t('pageNotFound')}
      image={pageNotFoundImage}
    />
  );
};
