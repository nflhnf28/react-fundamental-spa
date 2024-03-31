import PropTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
	return (
		<LocaleConsumer>
			{({ locale }) => {
				return (
					<section className='search-bar'>
						<input
							className='search-bar'
							type='text'
							placeholder={
								locale === "id" ? "Cari berdasarkan nama" : "Search by name"
							}
							value={keyword}
							onChange={(event) => keywordChange(event.target.value)}
						/>
					</section>
				);
			}}
		</LocaleConsumer>
	);
}

SearchBar.propTypes = {
	keyword: PropTypes.string,
	keywordChange: PropTypes.func,
};

export default SearchBar;
