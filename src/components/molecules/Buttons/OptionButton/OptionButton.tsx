import classNames from 'classnames';

import styles from './OptionButton.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '../DefaultButton';

type Props = React.ComponentProps<typeof DefaultButton> & {
  selected?: boolean;
};

export const OptionButton = ({
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
      aria-selected={selected}
    >
      <Typography variant="bodytext">{children}</Typography>
    </DefaultButton>
  );
};
