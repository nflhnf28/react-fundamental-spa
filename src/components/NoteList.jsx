import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes }) {
	return (
		<div className='notes-list'>
			{notes.length === 0 ? (
				<p>Tidak ada catatan</p>
			) : (
				notes.map((note) => (
					<NoteItem
						key={note.id}
						id={note.id}
						title={note.title}
						body={note.body}
						createdAt={note.createdAt}
					/>
				))
			)}
		</div>
	);
}

NoteList.propTypes = {
	notes: PropTypes.array.isRequired,
};

export default NoteList;
