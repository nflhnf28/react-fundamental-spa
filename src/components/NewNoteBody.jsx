import PropTypes from "prop-types";

function NewNoteBody({ setBodyContent }) {
	return (
		<div>
			<div
				id='body'
				data-placeholder='Sebenarnya saya adalah...'
				contentEditable='true'
				style={{
					border: "1px solid #ccc",
					minHeight: "100px",
					padding: "5px",
				}}
				onInput={(e) => setBodyContent(e.target.textContent)}
			/>
		</div>
	);
}

NewNoteBody.propTypes = {
	setBodyContent: PropTypes.func.isRequired,
};

export default NewNoteBody;
