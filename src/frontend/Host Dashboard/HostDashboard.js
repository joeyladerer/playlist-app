import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, useAuth } from '../../backend/auth'
import Logo from '../../assets/AuxParty_2.png'
import EventListItem from './EventListItem'

import style from './HostDashboard.module.css'

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

    // loading state
    if (!currentUser) return <Box fontSize={'100px'}>Loading</Box>
    
    return (
        <Box className={style.MainBox}>
            <Box className={style.NavBar}>
                <Box className={style.LogoContainer}>
                    <Image src={Logo} boxSize={'50px'} />
                    <Text marginLeft={'5px'}>AuxParty</Text>
                </Box>
                <Box className={style.NavButtonContainer}>
                    <Text marginRight={'1vw'}>Hello, {currentUser?.firstname}</Text>
                    <Button
                    variant={'link'} color={'#150748'} margin={'1vw'}
                    fontSize={'18px'} fontWeight={'normal'}
                    _hover={{color: 'white'}} disabled={loading}
                    >My Account</Button>
                    <Button
                    variant={'link'} color={'#150748'} margin={'1vw'}
                    fontSize={'18px'} fontWeight={'normal'}
                    _hover={{color: 'white'}} disabled={loading}
                    onClick={handleLogout}
                    >Log Out</Button>
                </Box>
            </Box>
            <Box className={style.ContentContainer}>
                <Box className={style.Heading}>
                    <Text>My Events</Text>
                    <Button
                    background={'#4B2E4A'} borderRadius={'full'}
                    fontSize={'20px'} fontWeight={'normal'}
                    _hover={{background: '#4B2E4A', color: '#E7C397'}}
                    onClick={handleCreateEvent} disabled={loading}
                    >+ Create Event</Button>
                </Box>
                <Box height={'1px'} background='#C7C9F2' width={'70vw'} />
                {
                    currentUser?.eventsRef.length > 0 ?
                    currentUser?.eventsRef.map((event) => <EventListItem key={event.eventID} event={event} />) : 
                    <Text color={'#C7C9F2'} fontStyle={'italic'} marginTop={'15px'} >Looks like you don't have any events coming up!</Text>
                }
                <Button 
                    variant={'link'} color={'white'} fontWeight='normal' fontSize={'18px'}
                    marginTop={'15px'} _hover={{color: '#E7C397'}} 
                    onClick={() => navigate('/createevent')} disabled={loading}>
                    + Create New Event
                </Button>
            </Box>
            
        </Box>
    )
}

export default HostDashboard