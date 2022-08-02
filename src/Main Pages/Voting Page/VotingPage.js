import { Box, Button } from '@chakra-ui/react'
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
            setPlaylist(result?.playlist)
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

    console.log(playlist)

    // this function updates a song's vote count on the FRONTEND ONLY
    // called in SongVotingContainer components as a callback
    const updateSong = (songId, action) => {
        setPlaylist(current => 
            current.map(song => {
                if (song.songId === songId) {
                    var upvotes = song.numUpvotes
                    var downvotes = song.numDownvotes
                    var totalVotes = song.totalVotes
                    switch (action) {
                        case "ADD_UP":
                            upvotes += 1
                            totalVotes += 1
                            break;
                        case "REMOVE_UP":
                            upvotes -= 1
                            totalVotes -= 1
                            break;
                        case "SWITCH_UP":
                            upvotes += 1
                            downvotes -= 1
                            totalVotes += 2
                            break;
                        case "ADD_DOWN":
                            downvotes += 1
                            totalVotes -= 1
                            break;
                        case "REMOVE_DOWN":
                            downvotes -= 1
                            totalVotes += 1
                            break;
                        case "SWITCH_DOWN":
                            downvotes += 1
                            upvotes -= 1
                            totalVotes -= 2
                            break;
                        default:
                            break;
                    }
                    return {...song, 
                        numUpvotes: upvotes, 
                        numDownvotes: downvotes, 
                        totalVotes: totalVotes}
                }
                return song
            })
        )
    }

    // // IMPLEMENT THIS IN THE FUTURE WHEN "ADD SONGS" FUNCTIONALITY IS NEEDED
    // const addSong = (song) => {
    //     setPlaylist(current => [...current, song])
    // }

    return (
        <Box>
            <Box>VOTE HERE</Box>
            <Box>{event?.eventID}</Box>
            <Box>{event?.eventName}</Box>
            <Box>{event?.eventDescription}</Box>
            <Box>{event?.eventImage}</Box>
            <Box>{event?.eventDate}</Box>
            <Box>Hosted By {event?.hostFirstname} {event?.hostLastname}</Box>
            <Box>{
                playlist ? 
                playlist.sort((a, b) => b.totalVotes - a.totalVotes)
                .map((song) => {return (<SongVotingContainer key={song.songId} song={song} updateSong={updateSong} />)})
                : null
            }
            </Box>
            <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => navigate('/')}>To Landing Page</Button>
        </Box>
    )
}

export default VotingPage