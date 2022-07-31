import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, useAuth } from '../backend/auth'

function HostDashboard () {
    const currentUser = useAuth()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
        } catch {
            alert("error!")
        }
        setLoading(false)
        navigate('/')
    }

    const handleCreateEvent = () => {
        navigate('/createevent')
    }
    
    return (
        <Box>
            <Box>{currentUser?.email}</Box>
            <Box>{currentUser?.firstname}</Box>
            <Box>{currentUser?.lastname}</Box>
            <Box>{currentUser?.uid}</Box>
            {/* <Box>{currentUser?.eventsRef}</Box> */}
            <Button disabled={loading || !currentUser} onClick={handleCreateEvent}>Create Event</Button>
            <Button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</Button>

            {currentUser?.eventsRef.map((event) => {
                return (
                    <Button key={event.eventID} onClick={() => navigate(`/event/${event.eventID}`)}>{event.eventName}</Button>
                )
            })}
        </Box>
    )
}

export default HostDashboard