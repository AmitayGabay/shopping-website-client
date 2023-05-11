import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [searchParam] = useSearchParams();
    useEffect(() => {
        console.log(searchParam.get("s"));
    }, [searchParam]);

    return (
        <h2>Search</h2>
    )
}

export default Search;