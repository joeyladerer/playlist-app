import { Box, Button, Center, CircularProgress, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateEventPlaylist, useEvent } from '../../backend/events'
import SongVotingContainer from './SongVotingContainer'
import { getToken, spotifySongToPlaylistObject } from '../../backend/spotify'
import SearchBar from '../SearchBar'

function VotingPage () {
    const [event, setEvent] = useState()
    const [playlist, setPlaylist] = useState()
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState()
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
            await updateEventPlaylist(event.eventID, [...playlist, ...selectedSongs])
            setLoading(false)
            navigate('/')
        } catch(error) {
            console.log(error)
        } 
    }

    // function passed into search bar
    const handleSelectSong = (song) => {
        setSelectedSongs([...selectedSongs, spotifySongToPlaylistObject(song)])
    }

    // this function updates a song's vote count on the FRONTEND ONLY
    // called in SongVotingContainer components as a callback
    // the action variable is specified to handle each specific type of change a user makes
    const updateSong = (songId, action) => {
        setPlaylist(current => 
            current.map(song => {
                if (song.song.id === songId) {
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
                    .map((song) => {return (<SongVotingContainer key={song.song.id} song={song} updateSong={updateSong} />)})
                    : null
                }
                </Box>
            </Flex>
            <Box style={{display: 'flex', color:'white'}}>
                <SearchBar width={'50vw'} popup={false} handleSelectSong={handleSelectSong} token={token} />
                <Box>
                    {selectedSongs.map((song) => {
                        return (
                            <Box key={song.song.id}>{song.song.name}</Box>
                        )
                    })}
                </Box>
            </Box>
            <Button disabled={loading} isLoading={loading} onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => navigate('/')}>To Landing Page</Button>
        </>
    )
}

export default VotingPage