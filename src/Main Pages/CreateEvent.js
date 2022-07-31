import { Box, Button, Input } from '@chakra-ui/react'
import { createEvent } from '../backend/events'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../backend/auth'

function CreateEvent() {
    const currentUser = useAuth()

    const [loading, setLoading] = useState(false)
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventImage, setEventImage] = useState('')
    const [eventDate, setEventDate] = useState('')

    const navigate = useNavigate()

    // input handling
    const handleEventName = (event) => {
        setEventName(event.target.value)
    }
    const handleEventDescription = (event) => {
        setEventDescription(event.target.value)
    }
    const handleEventImage = (event) => {
        setEventImage(event.target.value)
    }
    const handleEventDate = (event) => {
        setEventDate(event.target.value)
    }

    // on submit, create the event and navigate to event details page
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const event = await createEvent(eventName, eventDescription, eventImage, eventDate, currentUser)
            setLoading(false)
            navigate(`/event/${event.eventID}`)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Box>Current User: {currentUser?.email}, {currentUser?.firstname} {currentUser?.lastname}</Box>
            <Box>Create Event</Box>
            <Input placeholder={'Event Name'} onChange={handleEventName} />
            <Input placeholder={'Event Description'} onChange={handleEventDescription} />
            <Input placeholder={'Event Image'} onChange={handleEventImage} />
            <Input placeholder={'Event Date'} onChange={handleEventDate} />
            <Button onClick={handleSubmit} disabled={loading}>Create Event</Button>
        </Box>
    )
}

export default CreateEvent