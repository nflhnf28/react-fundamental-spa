import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import DetailPage from "./DetailPage";
import HomePage from "../pages/HomePage";
import AddNotePage from "../pages/AddNotePage";
import ToggleTheme from "./ToggleTheme";
import { ThemeProvider } from "../context/ThemeContext";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import {
	getUserLogged,
	putAccessToken,
	deleteNote,
} from "../utils/network-data";
import { FiLogOut } from "react-icons/fi";
import { LocaleProvider } from "../context/LocaleContext";
import { FaLanguage } from "react-icons/fa";

function NoteApp() {
	const [notes, setNotes] = useState([]); // Initialize notes state with all notes
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark"); // Set up the theme based on local storage
	// const [initializing, setInitializing] = useState(true); // State for initialization
	const [authedUser, setAuthedUser] = useState(null);
	const [initializing, setInitializing] = useState(true);
	const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");

	// Toggle language
	const toggleLocale = () => {
		const newLocale = locale === "id" ? "en" : "id";
		localStorage.setItem("locale", newLocale);
		setLocale(newLocale);
	};

	const localeContext = {
		locale,
		toggleLocale,
	};

	// fetch user logged in
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getUserLogged();
				setAuthedUser(data);
				setInitializing(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchData();
	}, []);

	// set theme change
	useEffect(() => {
		const rootDiv = document.getElementById("root");
		rootDiv.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	// delete a note
	const onDelete = (id) => {
		deleteNote(id);
		setNotes(notes.filter((note) => note.id !== id)); // Update notes state after deletion
	};

	const onLoginSuccess = async ({ accessToken }) => {
		putAccessToken(accessToken);
		const { data } = await getUserLogged();
		setAuthedUser(data);
	};

	// Set up the logout function (local storage)
	const onLogout = () => {
		setAuthedUser(null);
		putAccessToken("");
	};

	// Render loading text if still initializing
	if (initializing) {
		return (
			<div className='app-container loading'>
				<h1 className='load-text'>Loading...</h1>
				<p className='load-text'>Waiting to fetch data..</p>
			</div>
		);
	}

	// Not logged in display:
	if (authedUser === null) {
		return (
			<LocaleProvider value={localeContext}>
				<ThemeProvider
					value={{
						theme,
						toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
					}}
				>
					<div className='app-container'>
						<header className='contact-app__header'>
							<h1>{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</h1>
							<button
								className='toggle-locale'
								onClick={toggleLocale}
							>
								<FaLanguage />
							</button>
							<ToggleTheme />
						</header>

						<main>
							<Routes>
								<Route
									path='/*'
									element={<LoginPage loginSuccess={onLoginSuccess} />}
								/>
								<Route
									path='/register'
									element={<RegisterPage />}
								/>
							</Routes>
						</main>
					</div>
				</ThemeProvider>
			</LocaleProvider>
		);
	}

	// If logged in display:
	return (
		<LocaleProvider value={localeContext}>
			<ThemeProvider
				value={{
					theme,
					toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
				}}
			>
				<div className='app-container'>
					<header>
						<h1>
							<Link to='/'>
								{locale === "id" ? "Aplikasi Catatan" : "Notes App"}
							</Link>
						</h1>
						<nav className='navigation'>
							<ul>
								<li>
									<Link to='/archives'>
										{localeContext === "id" ? "Arsip" : "Archives"}
									</Link>
								</li>
							</ul>
						</nav>
						<button
							className='toggle-locale'
							onClick={toggleLocale}
						>
							<FaLanguage />
						</button>
						<ToggleTheme />
						<button
							className='button-logout'
							onClick={onLogout}
						>
							{authedUser.name}
							<FiLogOut />
						</button>
					</header>

					<main>
						<Routes>
							<Route
								path='/notes/new'
								element={<AddNotePage />}
							/>
							<Route
								path='/'
								element={<HomePage />}
							/>
							<Route
								path='/detail/:id'
								element={<DetailPage onDelete={onDelete} />}
							/>
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</LocaleProvider>
	);
}

export default NoteApp;
