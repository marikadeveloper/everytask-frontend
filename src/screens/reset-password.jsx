import {useAuth} from "../context/auth-context.jsx";
import {useForm} from "react-hook-form";
import {Button, ErrorMessage, Input} from "../components/lib.jsx";
import {useAsync} from "../utils/hooks.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";

function ResetPasswordScreen() {
	const {resetPassword} = useAuth();
	const {register, handleSubmit, formState} = useForm();
	// TODO: do something with those errors?
	const {errors} = formState;
	const {data, setData, error, isLoading, isError, run} = useAsync();
	const [token, setToken] = useState(null);
	const [params] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		setToken(params.get('token'));
	}, [params]);

	useEffect(() => {
		if (data && data.ok) {
			toast('Password reset successfully');
			navigate('/');
		}
	}, [data, navigate]);

	const onSubmit = (data) => {
		run(resetPassword({...data, token}));
	};

	return (
		<div>
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Password"
					id='password'
					type='password'
					{...register('password', {required: true})}
				/>

				<Input
					label="Password Confirmation"
					id='passwordConfirmation'
					type='password'
					{...register('passwordConfirmation', {required: true})}
				/>
				{isError ? <ErrorMessage error={error}/> : null}
				<div>
					<Button type='submit' isLoading={isLoading}>Reset Password</Button>
				</div>
			</form>
		</div>
	);

}

export {ResetPasswordScreen};