import React, { useEffect, useState } from 'react'
import { Box, Input, Button } from '@chakra-ui/react'
import { search } from '../backend/spotify'


function SearchBar ({
    popup = true,
    handleSelectSong = (_) => null,
    token,
    width='100vw'
}) {

    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (searchInput && token) {
            search(searchInput, token).then((response) => setSearchResults(response))
        }
    }, [searchInput, token])

    const handleSearch = (event) => {
        setSearchInput(event.target.value)
    }

    return (
    <Box color='white' width={width}>
        <Input placeholder='Search' onChange={handleSearch} />
        <Box>
            {searchResults.map((item) => {
                return (
                    <Button 
                    key={item.id} color={'black'} 
                    onClick={() => handleSelectSong(item)}>
                        {item.name + ' - ' + item.artists[0].name}
                    </Button>
                )
            })}
        </Box>
    </Box>
    )
}

export default SearchBar