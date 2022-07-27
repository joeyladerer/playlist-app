import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, useAuth } from '../firebase'

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
    
    return (
        <Box>
            <Box>{currentUser?.email}</Box>
            <Button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</Button>
        </Box>
    )
}

export default HostDashboard