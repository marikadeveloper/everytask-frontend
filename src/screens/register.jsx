import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, ErrorMessage, FormGroup} from '../components/lib';
import {useAuth} from '../context/auth-context';
import {useAsync} from '../utils/hooks';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function RegisterScreen() {
	const {register: registerUser} = useAuth();
	const {register, handleSubmit, formState} = useForm();
	const {errors} = formState;
	const {error, isLoading, isError, run, isSuccess} = useAsync();
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) {
			toast('Registration successful, log in to continue');
			navigate('/');
		}
	}, [isSuccess, navigate]);

	const onSubmit = (data) => {
		run(registerUser(data));
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						{...register('email', {required: true})}
					/>
				</FormGroup>
				<FormGroup>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						{...register('password', {required: true})}
					/>
				</FormGroup>
				<FormGroup>
					<label htmlFor='passwordConfirmation'>Password Confirmation</label>
					<input
						id='passwordConfirmation'
						type='password'
						{...register('passwordConfirmation', {
							required: true,
						})}
					/>
				</FormGroup>
				{isError ? <ErrorMessage error={error}/> : null}
				<div>
					<Button isLoading={isLoading} type='submit'>Register</Button>
				</div>
			</form>
			<p>
				Already registered? <Link to='/'>Sign in</Link>
			</p>
		</div>
	);
}

export {RegisterScreen};
