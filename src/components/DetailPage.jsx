import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FiTrash2 } from "react-icons/fi";
import { showFormattedDate } from "../utils/index.js";
import { getNote, deleteNote } from "../utils/network-data.js";

function DetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [note, setNote] = useState(null);

	useEffect(() => {
		const fetchNote = async () => {
			try {
				if (id) {
					const { data, error } = await getNote(id);
					if (!error) {
						setNote(data);
					} else {
						// Handle error (e.g., note not found)
						console.error("Error fetching note:", error);
						navigate("/"); // Redirect to home page if note not found
					}
				}
			} catch (error) {
				console.error("Error fetching note:", error);
				// Handle error (e.g., network error)
				navigate("/"); // Redirect to home page on error
			}
		};
		fetchNote();
	}, [id, navigate]);

	const handleDelete = async () => {
		try {
			await deleteNote(id);
			navigate("/");
		} catch (error) {
			console.error("Error deleting note:", error);
		}
	};

	if (!id) {
		return <div>No note ID provided</div>;
	}

	if (!note) {
		return <div>Note not found</div>;
	}

	return (
		<div>
			<h2>{note.title}</h2>
			<p>{showFormattedDate(note.createdAt)}</p>
			<p>{note.body}</p>

			<div className='homepage__action'>
				<button
					onClick={handleDelete}
					className='action'
				>
					<FiTrash2 />
				</button>
			</div>
		</div>
	);
}

DetailPage.propTypes = {
	onDelete: PropTypes.func.isRequired,
};

export default DetailPage;
