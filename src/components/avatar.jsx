import { Avatar as NuiAvatar } from '@nextui-org/react';
import React from 'react';

const Avatar = React.forwardRef((props, ref) => (
  <NuiAvatar
    ref={ref}
    showFallback
    src='https://images.unsplash.com/broken'
    as='button'
    className='transition-transform'
    {...props}
  />
));

export { Avatar };
