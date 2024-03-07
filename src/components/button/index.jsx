import { Button as NuiButton } from '@nextui-org/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '../../assets/icons/index.jsx';
import './styles.scss';

function Button({ isLoading, type, size, className, children }) {
  return (
    <NuiButton
      color='primary'
      isLoading={isLoading}
      type={type}
      size={size}
      className={className}>
      {children}
    </NuiButton>
  );
}
Button.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

function LinkButton({ size = 'sm', to, className, children }) {
  return (
    <NuiButton
      className={'link-button ' + className}
      color='primary'
      variant='bordered'
      startContent={<ArrowBack />}
      as={Link}
      to={to}
      size={size}>
      {children}
    </NuiButton>
  );
}
LinkButton.propTypes = {
  to: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Button, LinkButton };
