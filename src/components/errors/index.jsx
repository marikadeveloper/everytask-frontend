import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

function ErrorMessage({ error }) {
  return (
    <div
      className='error-message'
      role='alert'>
      <span>There was an error: </span>
      <pre>{error.message}</pre>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
};

function FullPageErrorFallback({ error }) {
  return (
    <div
      className='full-page-error-fallback'
      role='alert'>
      <p>There is a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

FullPageErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
};

export { ErrorMessage, FullPageErrorFallback };
