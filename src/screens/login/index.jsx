import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {Button, ErrorMessage, Input} from '../../components/lib.jsx';
import {useAuth} from '../../context/auth-context.jsx';
import {useAsync} from '../../utils/hooks.jsx';
import './styles.scss';

function LoginScreen() {
	const {login} = useAuth();
	const {register, handleSubmit} = useForm();
	// const {errors} = formState;

	const {error, isLoading, isError, run} = useAsync();

	const onSubmit = (data) => {
		run(login(data));
	};

	return (
		<div className="login">
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="login__form">
				<Input
					id='email'
					type='email'
					label="Email"
					placeholder="Email"
					{...register('email', {required: true})}
				/>
				<Input
					id='password'
					type='password'
					label="Password"
					placeholder="Password"
					{...register('password', {required: true})}
				/>
				<Link to='/forgot-password' className="login__form__forgot-password">Forgot password</Link>
				{isError ? <ErrorMessage error={error}/> : null}
				<div>
					<Button isLoading={isLoading} type='submit' className="login__form__submit">Login</Button>
				</div>
			</form>
			<p className="login__sign-up">
				Not registered? <Link to='/register'>Sign up</Link>
			</p>
		</div>
	);
}

export {LoginScreen};
