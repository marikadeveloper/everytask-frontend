import { Button as NuiButton } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowBack } from '../../assets/icons/index';
import './styles.scss';

function Button({
  isLoading,
  type,
  size,
  className,
  children,
  onClick,
  onPress,
  variant,
  color = 'primary',
}) {
  return (
    <NuiButton
      color={color}
      onClick={onClick}
      onPress={onPress}
      isLoading={isLoading}
      type={type}
      size={size}
      className={className}
      variant={variant}
    >
      {children}
    </NuiButton>
  );
}
Button.defaultProps = {
  isLoading: false,
  type: 'button',
  size: 'lg',
  className: '',
  children: null,
  onClick: () => {},
  onPress: () => {},
  variant: 'solid',
};
Button.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  variant: PropTypes.string,
};

function LinkButton({ size = 'sm', to, className, children }) {
  return (
    <NuiButton
      className={`link-button ${className}`}
      color='primary'
      variant='bordered'
      startContent={<ArrowBack />}
      as={Link}
      to={to}
      size={size}
    >
      {children}
    </NuiButton>
  );
}

LinkButton.defaultProps = {
  to: '/',
  size: 'sm',
  className: '',
  children: null,
};
LinkButton.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

function IconButton({ icon, ...props }) {
  return (
    <NuiButton
      className='icon-button'
      color='danger'
      variant='light'
      isIconOnly
      startContent={icon}
      {...props}
    />
  );
}

export { Button, IconButton, LinkButton };
