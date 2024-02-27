import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Input as NuiInput,
	Button as NuiButton,
	Avatar as NuiAvatar,
	Dropdown,
	DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import React from "react";
import {useAuth} from "../context/auth-context.jsx";

function Button(props) {
	return <NuiButton color="primary" {...props} />;
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

const Input = React.forwardRef((props, ref) => {
	return (
		<NuiInput
			variant='bordered'
			size="md"
			ref={ref}
			{...props}
		/>
	);
})

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

function Avatar() {
	const {user, logout} = useAuth();

	return <Dropdown placement="bottom-end">
		<DropdownTrigger>
			<NuiAvatar showFallback src='https://images.unsplash.com/broken' as="button" className="transition-transform"/>
		</DropdownTrigger>
		<DropdownMenu aria-label="Profile Actions" variant="flat">
			<DropdownItem key="profile" className="h-14 gap-2" textValue={"Signed in as " + user.email}>
				<p className="font-medium">Signed in as</p>
				<p className="font-medium">{user.email}</p>
			</DropdownItem>
			<DropdownItem key="logout" onClick={logout}>
				Log Out
			</DropdownItem>
		</DropdownMenu>
	</Dropdown>

}

export {
	Avatar,
	Button,
	ErrorMessage,
	FullPageErrorFallback,
	FullPageSpinner,
	Input,
	Link,
	Spinner,
};
