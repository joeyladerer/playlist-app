import { Box, Button, Center, CircularProgress, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, useAuth } from '../../backend/auth'
import { deleteEvent } from '../../backend/events'
import Logo from '../../assets/AuxParty_2.png'
import EventListItem from './EventListItem'

import style from './HostDashboard.module.css'

function HostDashboard () {
    const currentUser = useAuth()
    const [loading, setLoading] = useState(false)
    const [tryDelete, setTryDelete] = useState({state: false, event: undefined})

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

    const handleDelete = (event) => {
        setTryDelete({state: true, event: event})
    }

    const confirmDelete = async () => {
        setLoading(true)
        const event = tryDelete.event
        try {
            await deleteEvent(event.eventID, currentUser)
        } catch(error) {
            console.log(error)
            return
        }
        setLoading(false)
        setTryDelete({state: false, event: undefined})
        // current solution, its janky. need to fix. 
        window.location.reload(false)
    }

    // loading state
    if (!currentUser) return <Center><CircularProgress size='100px' marginTop='100px' 
                    isIndeterminate color='#C7C9F2' trackColor='#E7C397' /></Center>
    
    return (
        <Box className={style.MainBox}>
            <Box className={style.NavBar}>
                <Box className={style.LogoContainer}>
                    <Image src={Logo} boxSize={'50px'} />
                    <Text marginLeft={'5px'}>crowdify</Text>
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
                    currentUser?.eventsRef.map((event) => <EventListItem key={event.eventID} event={event} handleDelete={handleDelete} />) : 
                    <Text color={'#C7C9F2'} fontStyle={'italic'} marginTop={'15px'} >Looks like you don't have any events coming up!</Text>
                }
                <Button 
                    variant={'link'} color={'white'} fontWeight='normal' fontSize={'18px'}
                    marginTop={'15px'} _hover={{color: '#E7C397'}} 
                    onClick={() => navigate('/createevent')} disabled={loading}>
                    + Create New Event
                </Button>
            </Box>
            
            

            {tryDelete.state === true ? 
            <>
                <Box width={'100vw'} height={'100vh'} zIndex={4} position={'fixed'} left={'0px'} top={'0px'}
                    opacity={.4} background={'black'}
                    _hover={{background: 'black'}}
                    onClick={() => setTryDelete({state: false, event: undefined})}
                />
                <Box className={style.CancelContainer}>
                    <Text>Are you sure you want to delete this event? This action can not be reversed. </Text>
                    <Box className={style.CancelButtonContainer}>
                        <Button width={'100px'}
                        onClick={() => setTryDelete({state: false, event: undefined})}
                        disabled={loading}
                        >Cancel</Button>
                        <Button background={'#C15B5B'} _hover={{background: 'red'}} width={'100px'}
                        onClick={() => confirmDelete()} disabled={loading} isLoading={loading}
                        >Delete</Button>
                    </Box>
                </Box>
            </> :
            null}
        </Box>
    )
}

export default HostDashboard