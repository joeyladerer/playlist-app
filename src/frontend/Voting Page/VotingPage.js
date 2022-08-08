import { Box, Button, Center, CircularProgress, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateEventPlaylist, useEvent } from '../../backend/events'
import SongVotingContainer from './SongVotingContainer'

function VotingPage () {
    const [event, setEvent] = useState()
    const [playlist, setPlaylist] = useState()
    const [loading, setLoading] = useState(false)

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

    // loading state
    if (!playlist) return <Center><CircularProgress size='100px' marginTop='100px' 
                    isIndeterminate color='#C7C9F2' trackColor='#E7C397' /></Center>

    return (
        <Flex direction={'column'} alignItems={'center'}>
            <Box>{event?.eventID}</Box>
            <Box>{event?.eventName}</Box>
            <Box>{event?.eventDescription}</Box>
            <Box>{event?.eventImage}</Box>
            <Box>{event?.eventDate}</Box>
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
    )
}

export default VotingPage