import { Icon } from '../Icon';

import favouritesIcon from '@/shared/assets/icons/Favourites.svg?no-inline';
import favouritesFilledIcon from '@/shared/assets/icons/FavouritesFilled.svg?no-inline';
import favouritesWithCounterIcon from '@/shared/assets/icons/FavouritesWithCounter.svg?no-inline';

import { IconWithCounter } from '../IconWithCounter';

type Props = {
  quantity?: number;
  filled?: boolean;
  className?: string;
};

export const FavouritesIcon = ({
  quantity = 0,
  filled = false,
  className,
}: Props) => {
  if (quantity > 0) {
    return (
      <IconWithCounter
        icon={favouritesWithCounterIcon}
        quantity={quantity}
        className={className}
      />
    );
  }

  return (
    <Icon
      icon={filled ? favouritesFilledIcon : favouritesIcon}
      className={className}
    />
  );
};
