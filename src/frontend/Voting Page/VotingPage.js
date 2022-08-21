import { Box, Button, Center, CircularProgress, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateEventPlaylist, useEvent } from '../../backend/events'
import SongVotingContainer from './SongVotingContainer'
import { getToken, search } from '../../backend/spotify'


function VotingPage () {
    const [event, setEvent] = useState()
    const [playlist, setPlaylist] = useState()
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState()
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedSongs, setSelectedSongs] = useState([])

    const navigate = useNavigate()

    // hook with if statements to prevent infinite rendering
    useEvent(window.location.pathname.split("/")[2])
    .then((result) => {
        if (!event) {
            setEvent(result)
        }
        if (!playlist) {
            setPlaylist(result?.playlist.sort((a, b) => b.netVoteCount - a.netVoteCount))
        }
    })

    // get spotify access token
    useEffect(() => {
        getToken().then((response) => setToken(response))
    }, [])

    // update the backend and navigate to a "success" page
    const handleSubmit = async () => {
        setLoading(true)
        try {
            await updateEventPlaylist(event.eventID, playlist)
            setLoading(false)
            navigate('/')
        } catch(error) {
            console.log(error)
        } 
    }

    const handleSearch = (event) => {
        setSearchInput(event.target.value)
    }

    const handleSelectSong = (song) => {
        setSelectedSongs([...selectedSongs, song])
    }

    useEffect(() => {
        if (searchInput && token) {
            search(searchInput, token).then((response) => setSearchResults(response))
        }
    }, [searchInput, token])

    // this function updates a song's vote count on the FRONTEND ONLY
    // called in SongVotingContainer components as a callback
    // the action variable is specified to handle each specific type of change a user makes
    const updateSong = (songId, action) => {
        setPlaylist(current => 
            current.map(song => {
                if (song.songId === songId) {
                    var upvotes = song.numUpvotes
                    var downvotes = song.numDownvotes
                    var netVoteCount = song.netVoteCount
                    switch (action) {
                        case "ADD_UP":
                            upvotes += 1
                            netVoteCount += 1
                            break;
                        case "REMOVE_UP":
                            upvotes -= 1
                            netVoteCount -= 1
                            break;
                        case "SWITCH_UP":
                            upvotes += 1
                            downvotes -= 1
                            netVoteCount += 2
                            break;
                        case "ADD_DOWN":
                            downvotes += 1
                            netVoteCount -= 1
                            break;
                        case "REMOVE_DOWN":
                            downvotes -= 1
                            netVoteCount += 1
                            break;
                        case "SWITCH_DOWN":
                            downvotes += 1
                            upvotes -= 1
                            netVoteCount -= 2
                            break;
                        default:
                            break;
                    }
                    return {...song, 
                        numUpvotes: upvotes, 
                        numDownvotes: downvotes, 
                        netVoteCount: netVoteCount}
                }
                return song
            })
        )
    }

    // // IMPLEMENT THIS IN THE FUTURE WHEN "ADD SONGS" FUNCTIONALITY IS NEEDED
    // const addSong = (song) => {
    //     setPlaylist(current => [...current, song])
    // }

    console.log(selectedSongs)
    // loading state
    if (!playlist || !token) return <Center><CircularProgress size='100px' marginTop='100px' 
                    isIndeterminate color='#C7C9F2' trackColor='#E7C397' /></Center>

    return (
        <>
            <Flex direction={'column'} alignItems={'center'} color={'white'} >
                <Box>{event?.eventID}</Box>
                <Box>{event?.eventName}</Box>
                <Box>{event?.eventDescription}</Box>
                <Box>{event?.eventImage}</Box>
                <Box>{event?.eventDate}</Box>
                <Text color={'white'}>{token}</Text>
                <Box>Hosted By {event?.hostFirstname} {event?.hostLastname}</Box>
                <Box fontSize={'30px'}>VOTE HERE</Box>
                <Box>{
                    playlist ? 
                    playlist
                    .map((song) => {return (<SongVotingContainer key={song.songId} song={song} updateSong={updateSong} />)})
                    : null
                }
                </Box>
                <Button disabled={loading} isLoading={loading} onClick={handleSubmit}>Submit</Button>
                <Button onClick={() => navigate('/')}>To Landing Page</Button>
            </Flex>
            <Box color='white'>
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
        </>
    )
}

export default VotingPage