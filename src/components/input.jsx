import { Input as NuiInput } from '@nextui-org/react';
import React from 'react';

const Input = React.forwardRef((props, ref) => {
  return (
    <NuiInput
      variant='bordered'
      size='md'
      ref={ref}
      {...props}
    />
  );
});

export { Input };
