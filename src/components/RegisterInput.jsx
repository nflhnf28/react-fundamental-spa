import { useState } from "react";
import PropTypes from "prop-types";

function RegisterInput({ register }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Password not match!");
			return;
		}
		register({ name, email, password });
	};

	return (
		<div className='input-register'>
			<form onSubmit={onSubmitHandler}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					placeholder='Name'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					placeholder='Email'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					placeholder='Password'
					id='password'
					autoComplete='new-password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor='cfpassword'>Confirm Password</label>
				<input
					type='password'
					placeholder='Confirm Password'
					id='cfpassword'
					autoComplete='new-password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button>Register</button>
			</form>
		</div>
	);
}

RegisterInput.propTypes = {
	register: PropTypes.func.isRequired,
};

export default RegisterInput;
