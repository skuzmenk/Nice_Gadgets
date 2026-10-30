import classNames from 'classnames';
import styles from './Logo.module.scss';
import logo from '@/shared/assets/icons/Logo.svg';
import { ImageWithFallback } from '@/components/organisms';
import { placeholder } from '@/shared/constants';
import logoDark from '@/shared/assets/icons/Logo-dark.svg';
import { useThemeStore } from '@/store/useThemeStore';

type LogoSize = 'small' | 'big';

type Props = {
  size?: LogoSize;
  className?: string;
};

export const Logo = ({ size = 'small', className }: Props) => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <ImageWithFallback
      fallback={placeholder['500x250']}
      src={theme === 'dark' ? logoDark : logo}
      className={classNames(styles.logo, styles[size], className)}
      alt="Logo"
    />
  );
};
