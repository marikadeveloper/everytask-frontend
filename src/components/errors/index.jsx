import PropTypes from "prop-types";
import "./styles.scss";
import { useMemo } from "react";

function ErrorMessage({ error }) {
  const errorMessage = useMemo(() => {
    if (error.message) {
      return error.message;
    }

    if (error.errors?.length) {
      /**
       * {
       *     "errors": [
       *         {
       *             "type": "field",
       *             "msg": "Invalid value",
       *             "path": "impact",
       *             "location": "body"
       *         },
       *         {
       *             "type": "field",
       *             "msg": "Invalid value",
       *             "path": "impact",
       *             "location": "body"
       *         }
       *     ]
       * }
       */
      // filter out unique path
      const uniquePaths = error.errors
        .map((e) => e.path)
        .filter((value, index, self) => self.indexOf(value) === index);
      // return for example "Impact: Invalid value, Name: Required"
      return uniquePaths
        .map((path) => {
          const messages = error.errors
            .filter((e) => e.path === path)
            .map((e) => e.msg);
          return `${path}: ${messages.join(", ")}`;
        })
        .join(", ");
    }

    return "An error occurred";
  }, [error]);

  return (
    <div className="error-message" role="alert">
      <span>There was an error: </span>
      <pre>{errorMessage}</pre>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
};

function FullPageErrorFallback({ error }) {
  return (
    <div className="full-page-error-fallback" role="alert">
      <p>There is a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

FullPageErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
};

export { ErrorMessage, FullPageErrorFallback };
