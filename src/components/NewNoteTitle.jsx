import PropTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";

function NewNoteTitle({ setTitleContent }) {
	return (
		<LocaleConsumer>
			{({ locale }) => {
				return (
					<div>
						<div
							id='body'
							data-placeholder={
								locale === "id" ? "Catatan Rahasia" : "Secret notes"
							}
							contentEditable='true'
							style={{
								border: "1px solid #ccc",
								minHeight: "20px",
								padding: "5px",
							}}
							onInput={(e) => setTitleContent(e.target.textContent)}
						/>
					</div>
				);
			}}
		</LocaleConsumer>
	);
}

NewNoteTitle.propTypes = {
	setTitleContent: PropTypes.func.isRequired,
};

export default NewNoteTitle;
