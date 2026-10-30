import styles from './RightsPage.module.scss';
import { Typography } from '@/components/atoms/Typography';
import ReactMarkdown from 'react-markdown';
import rightsTextEn from './rights.md?raw';
import rightsTextUk from './rights.uk.md?raw';
import { useTranslation } from 'react-i18next';

export const RightsPage = () => {
  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();

  const rightsText =
    i18n.resolvedLanguage?.startsWith('uk') ? rightsTextUk : rightsTextEn;

  const processedText = rightsText.replace('{{year}}', currentYear.toString());

  return (
    <div className={styles.container}>
      <Typography
        variant="h3"
        className={styles.title}
      >
        {t('rightsTitle')}
      </Typography>
      <Typography
        variant="bodytext"
        className={styles.text}
      >
        <ReactMarkdown>{processedText}</ReactMarkdown>
      </Typography>
    </div>
  );
};
