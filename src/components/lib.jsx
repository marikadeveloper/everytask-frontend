// TODO: create styles for those components
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';

function Button({isLoading, variant, children, onClick}) {
	return <button onClick={onClick}>{children}</button>;
}
Button.propTypes = {
	isLoading: PropTypes.bool,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
}

function ErrorMessage({error}) {
	return (
		<div
			role='alert'
			style={{color: 'red'}}>
			<span>There was an error: </span>
			<pre
				style={{
					whiteSpace: 'pre-wrap',
					color: 'red',
				}}>
        {error.message}
      </pre>
		</div>
	);
}

ErrorMessage.propTypes = {
	error: PropTypes.object.isRequired,
}

function FullPageErrorFallback({error}) {
	return (
		<div
			role='alert'
			style={{
				color: 'red',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}>
			<p>There is a problem. Try refreshing the app.</p>
			<pre>{error.message}</pre>
		</div>
	);
}
FullPageErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
}

function Link(props) {
	return <RouterLink {...props} />;
}

function FormGroup(props) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
			{...props}
		/>
	);
}

function Input(props) {
	return <input {...props} />;
}

function Spinner() {
	return <div>loading...</div>;
}

function FullPageSpinner() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}>
			<Spinner/>
		</div>
	);
}

export {
	Button,
	ErrorMessage,
	FormGroup,
	FullPageErrorFallback,
	FullPageSpinner,
	Input,
	Link,
	Spinner,
};
