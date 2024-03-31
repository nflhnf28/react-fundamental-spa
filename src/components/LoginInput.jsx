import { useState } from "react";
import PropTypes from "prop-types";

function LoginInput({ login }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onEmailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const onPasswordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		login({
			email: email,
			password: password,
		});
	};

	return (
		<div className='input-login'>
			<form onSubmit={onSubmitHandler}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={onEmailChangeHandler}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={onPasswordChangeHandler}
				/>
				<button>Login</button>
			</form>
		</div>
	);
}

LoginInput.propTypes = {
	login: PropTypes.func.isRequired,
};

export default LoginInput;
