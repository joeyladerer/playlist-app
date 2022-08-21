import { Box, Button, Center, CircularProgress } from "@chakra-ui/react"
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

    // loading state
    if (!event) return <Center><CircularProgress size='100px' marginTop='100px' 
                    isIndeterminate color='#C7C9F2' trackColor='#E7C397' /></Center>

    return (
        <Box color={'white'}>
            <Box>{event?.eventID}</Box>
            <Box>{event?.eventName}</Box>
            <Box>{event?.eventDescription}</Box>
            <Box>{event?.eventImage}</Box>
            <Box>{event?.eventDate}</Box>
            <Box>Hosted By {event?.hostFirstname} {event?.hostLastname}</Box>
            <Box>Songs</Box>
            <Box>{event?.playlist
                .sort((a, b) => b.netVoteCount - a.netVoteCount)
                .map((song) => song.song.name + ', ' + song.netVoteCount + ' votes; ')}
            </Box>
            <Button onClick={() => window.open(event.eventVotingURL, "_self")}>Click to Vote</Button>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Box>
    )
}

export default EventDetails