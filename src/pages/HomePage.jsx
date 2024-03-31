import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { getNote, deleteNote, getActiveNotes } from "../utils/network-data.js";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LocaleContext from "../context/LocaleContext.js";

function HomePage() {
	const [notes, setNotes] = useState([]);
	const { locale } = useContext(LocaleContext);

	useEffect(() => {
		// Fetch active notes
		getActiveNotes()
			.then(({ data }) => {
				setNotes(data);
			})
			.catch((error) => {
				console.error("Error fetching notes:", error);
			});
	}, []);

	// Function to delete a note
	async function onDelete(id) {
		await deleteNote(id);

		// update the contacts state from network.js
		const { data } = await getNote();
		setNotes(data);
	}

	return (
		<div>
			<h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
			<SearchBar />
			<NoteList
				notes={notes}
				onDelete={onDelete}
			/>
			<div className='homepage__action'>
				<Link
					to='/notes/new'
					className='action'
				>
					<FiPlusCircle />
				</Link>
			</div>
		</div>
	);
}

export default HomePage;
