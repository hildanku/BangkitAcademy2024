import React from 'react'
import PropTypes from 'prop-types'

function SearchBar({ keyword, onKeywordChange }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Cari catatan..."
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
            />
        </div>
    )
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    onKeywordChange: PropTypes.func.isRequired,
}

export default SearchBar
