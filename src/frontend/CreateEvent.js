import { Box, Button, Center, CircularProgress, Input } from '@chakra-ui/react'
import { createEvent } from '../backend/events'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../backend/auth'
import SearchBar from './SearchBar'
import { getToken, spotifySongToPlaylistObject } from '../backend/spotify'

function CreateEvent() {
    const currentUser = useAuth()

    const [loading, setLoading] = useState(false)
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [playlist, setPlaylist] = useState([])
    const [token, setToken] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        getToken().then((response) => setToken(response))
    })

    // input handling
    const handleEventName = (event) => {
        setEventName(event.target.value)
    }
    const handleEventDescription = (event) => {
        setEventDescription(event.target.value)
    }
    const handleEventDate = (event) => {
        setEventDate(event.target.value)
    }
    const handleSelectSong = (song) => {
        setPlaylist([...playlist, spotifySongToPlaylistObject(song)])
    }

    // on submit, create the event and navigate to event details page
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const event = await createEvent(eventName, eventDescription, 'eventImage', eventDate, playlist, currentUser)
            setLoading(false)
            navigate(`/event/${event.eventID}`)
        } catch(error) {
            console.log(error)
        }
    }

    // loading state
    if (!currentUser) return <Center><CircularProgress size='100px' marginTop='100px' 
                    isIndeterminate color='#C7C9F2' trackColor='#E7C397' /></Center>

    return (
        <Box color={'white'}>
            <Box>Current User: {currentUser?.email}, {currentUser?.firstname} {currentUser?.lastname}</Box>
            <Box>Create Event</Box>
            <Input placeholder={'Event Name'} onChange={handleEventName} />
            <Input placeholder={'Event Description'} onChange={handleEventDescription} />
            <Input placeholder={'Event Date'} onChange={handleEventDate} />
            <Box>Add Songs:</Box>
            <Box style={{display: 'flex', color: 'white'}}>
                <SearchBar width={'50vw'} popup={false} handleSelectSong={handleSelectSong} token={token} />
                {playlist.map((song) => {
                    return (
                        <Box key={song.song.id}>{song.song.name}</Box>
                    )
                })}
            </Box>
            <Button onClick={handleSubmit} isLoading={loading} disabled={loading}>Create Event</Button>
        </Box>
    )
}

export default CreateEvent