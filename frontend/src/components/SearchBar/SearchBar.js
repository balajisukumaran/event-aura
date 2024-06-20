import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import './SearchBar.css';

const SearchBar = () => {
    const [date, setDate] = useState(null);

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="searchbar-container p-3">
                        <div className="search-input mb-3 mb-md-0">
                            <input type="text" placeholder="Search events .." />
                        </div>
                        <div className="search-date mb-3 mb-md-0">
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                placeholderText="Pick a date .."
                            />
                        </div>
                        <button className="btn search-button">
                            <SearchTwoToneIcon sx={{ fontSize: 30 }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
