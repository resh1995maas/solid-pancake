import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieGrid from './MovieGrid';
import { API_KEY } from '../../apikey';

function Search({ apiKey }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fetchResults = async (term) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`
            );

            const data = await response.json();
            setResults(data.results ?? []);
            setLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error state
        }
    };

    const handleSearch = () => {
        fetchResults(searchTerm);
    };

    useEffect(() => {
        // You can also add a minimum length for the search term if needed
        if (searchTerm.length > 2) {
            fetchResults(searchTerm);
        }
    }, [searchTerm]);

    return (
        <section className="container mt-1">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Start typing to show results ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        border: '2px  grey', // Border color
                        borderRadius: '5px', // Border radius for rounded corners
                        backgroundColor: 'black', // Background color
                        color: 'white', // Text color
                        // fontWeight: 'bold', // Bold text
                        '::placeholder':{
                            color: 'white',
                    },}}
                />
                
            </div>
            {loaded ? (
                <>
                    <div className="mt-1" style={{ backgroundColor: 'grey', padding: '10px',width:'100%' }}>
                        {/* Add any additional styling for spacing or background color */}
                        <MovieGrid results={results} />
                    </div>
                </>
            ) : (
                <div className="loading mt-4">Loading...</div>
            )}
        </section>
    );
}

Search.propTypes = {
    apiKey: PropTypes.string.isRequired,
};

export default Search;




