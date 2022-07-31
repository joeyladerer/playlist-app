import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { useEvent } from "../backend/events"

const EventDetails = () => {
    const [event, setEvent] = useState()

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
        </Box>
    )
}

export default EventDetails