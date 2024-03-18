import { Avatar as NuiAvatar } from '@nextui-org/react';
import React from 'react';

// eslint-disable-next-line react/prop-types
const Avatar = React.forwardRef(({ originalProps, ...props }, ref) => (
  <NuiAvatar
    ref={ref}
    showFallback
    src='https://images.unsplash.com/broken'
    as='button'
    className='transition-transform'
    {...props}
  />
));

export default Avatar;
