import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateEventPlaylist, useEvent } from '../../backend/events'
import SongContainer from './SongContainer'

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
            console.log('set event')
        }
        console.log('running')
        if (!playlist) {
            console.log(playlist)
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

    // this function updates a song's vote count on the FRONTEND ONLY
    // backend updates will be called in handleSubmit
    const updateSong = (songId, changeValue) => {
        console.log('running, ' + songId)
        console.log(playlist)
        setPlaylist(current => 
            current.map(song => {
                if (song.songId === songId) {
                    const newTotal = song.totalVotes + changeValue
                    if (changeValue > 0) {
                        const newUpvotes = song.numUpvotes + changeValue
                        return {...song, numUpvotes: newUpvotes, totalVotes: newTotal}
                    } else {
                        const newDownvotes = song.numDownvotes - changeValue
                        return {...song, numDownvotes: newDownvotes, totalVotes: newTotal}
                    }
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
                .map((song) => {return (<SongContainer key={song.songId} song={song} updateSong={updateSong} />)})
                : null
            }
            </Box>
            <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => navigate('/')}>To Landing Page</Button>
        </Box>
    )
}

export default VotingPage