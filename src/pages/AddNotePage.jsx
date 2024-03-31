import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import NewNoteTitle from "../components/NewNoteTitle";
import NewNoteBody from "../components/NewNoteBody";
import { FiCheck } from "react-icons/fi";

function AddNotePage() {
	const [titleContent, setTitleContent] = useState("");
	const [bodyContent, setBodyContent] = useState("");
	const navigate = useNavigate();

	// Add async for asynchronous operation
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create new note object
		const newNote = {
			title: titleContent,
			body: bodyContent,
			archived: false,
			createdAt: new Date().toISOString(),
		};

		try {
			// Add the new note
			const { error } = await addNote(newNote);

			if (!error) {
				// Navigate to home page after adding the note
				navigate("/");
			} else {
				// Alert user if adding note fails
				alert("Failed to add note. Please try again.");
			}
		} catch (error) {
			// Alert user if an error occurs
			console.error("Error adding note:", error);
			alert("An error occurred while adding the note. Please try again.");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<NewNoteTitle setTitleContent={setTitleContent} />
				<NewNoteBody
					bodyContent={bodyContent}
					setBodyContent={setBodyContent}
				/>
				<div className='homepage__action'>
					<button
						type='submit'
						className='action'
					>
						<FiCheck />
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddNotePage;
