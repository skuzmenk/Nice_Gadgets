import classNames from 'classnames';

import styles from './ColorButton.module.scss';
import { DefaultButton } from '../DefaultButton';

type Props = Omit<
  React.ComponentProps<typeof DefaultButton>,
  'children' | 'color'
> & {
  color: string;
  selected?: boolean;
};

type ColorButtonStyle = React.CSSProperties & {
  '--selected-color'?: string;
};

export const ColorButton = ({
  color,
  selected = false,
  className,
  style,
  ...props
}: Props) => {
  const buttonStyle: ColorButtonStyle = {
    ...style,
    '--selected-color': color,
  };

  return (
    <DefaultButton
      {...props}
      className={classNames(styles.button, className)}
      style={buttonStyle}
      data-selected={selected}
      aria-pressed={selected}
    />
  );
};
