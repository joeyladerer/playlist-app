import { Box, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEvent } from "../backend/events"

const EventDetails = () => {
    const [event, setEvent] = useState()

    const navigate = useNavigate()

    // custom hook to retrieve the current event from the url
    useEvent(window.location.pathname.split("/")[2])
    .then((result) => {
        setEvent(result)
    })

    return (
        <Box>
            <Box>{event?.eventID}</Box>
            <Box>{event?.eventName}</Box>
            <Box>{event?.eventDescription}</Box>
            <Box>{event?.eventImage}</Box>
            <Box>{event?.eventDate}</Box>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Box>
    )
}

export default EventDetails