import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data.js";
import { LocaleConsumer } from "../context/LocaleContext.js";

function RegisterPage() {
	const navigate = useNavigate();

	async function onRegisterHandler(user) {
		// await register(user);
		const { error } = await register(user);
		if (!error) {
			navigate("/");
		}
	}

	return (
		<LocaleConsumer>
			{({ locale }) => {
				return (
					<section className='register-page'>
						<h2>
							{locale === "id"
								? "Isi form untuk mendaftar akun."
								: "Fill the form to register an account"}
						</h2>
						<RegisterInput register={onRegisterHandler} />
						<p>
							{locale === "id"
								? "Sudah punya akun? "
								: "Already have an account? "}
							<Link to='/'>
								{locale === "id" ? "Login disini" : "Login here"}
							</Link>
						</p>
					</section>
				);
			}}
		</LocaleConsumer>
	);
}

export default RegisterPage;
