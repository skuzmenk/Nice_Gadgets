import classNames from 'classnames';

import styles from './TextButton.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '../DefaultButton';

type Props = React.ComponentProps<typeof DefaultButton> & {
  selected?: boolean;
};

export const TextButton = ({
  selected = false,
  className,
  children,
  ...props
}: Props) => {
  return (
    <DefaultButton
      {...props}
      className={classNames(styles.button, className)}
      data-selected={selected}
      aria-pressed={selected}
    >
      <Typography variant="button">{children}</Typography>
    </DefaultButton>
  );
};
