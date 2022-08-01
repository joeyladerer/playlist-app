import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEvent } from '../backend/events'

function VotingPage () {
    const [event, setEvent] = useState()

    const navigate = useNavigate()

    useEvent(window.location.pathname.split("/")[2])
    .then((result) => {
        setEvent(result)
    })


    return (
        <Box>
            <Box>VOTE HERE</Box>
            <Box>{event?.eventID}</Box>
            <Box>{event?.eventName}</Box>
            <Box>{event?.eventDescription}</Box>
            <Box>{event?.eventImage}</Box>
            <Box>{event?.eventDate}</Box>
            <Box>Hosted By {event?.hostFirstname} {event?.hostLastname}</Box>
            <Button onClick={() => navigate('/')}>To Landing Page</Button>
        </Box>
    )
}

export default VotingPage