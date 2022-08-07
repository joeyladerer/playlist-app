import { Box, Image, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './HostDashboard.module.css'

import trash from "../../assets/Icons/delete (1).png"
import edit from "../../assets/Icons/edit.png"
import share from "../../assets/Icons/share-link.png"

function EventListItem({event}) {

    const navigate = useNavigate()

    const toast = useToast()

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`localhost:3000/vote/${event.eventID}`)
        toast({
            title: 'Copied to Clipboard',
            description: 'Share with your friends so they can vote.',
            status: 'success',
            duration: 7000,
            isClosable: true,
            // background: '#C7C9F2'
        })
    }

    if (event.eventName === 'Lit Ass Event') {
        return null
    }

    return (
        <Box className={style.MainContainer}>
            <Box className={style.ListItemContainer}>
                <Box width={'10vw'}>
                    <Text noOfLines={1} fontSize={'24px'} >{event.eventName}</Text>
                    <Text noOfLines={1} fontSize={'16px'}>{event.eventDate}</Text>
                </Box>
                <Text fontSize={'16px'} width={'40vw'} noOfLines={2} >{event.eventDescription}</Text>
                <Box className={style.Icons}>
                    <Image 
                        src={edit} cursor={'pointer'} boxSize={'30px'} 
                        _hover={{opacity: '80%'}}
                        onClick={() => navigate(`/event/${event.eventID}`)} />
                    <Image 
                        src={share} cursor={'pointer'} boxSize={'30px'} 
                        _hover={{opacity: '80%'}}
                        onClick={handleCopyLink} />
                    <Image 
                        src={trash} cursor={'pointer'} boxSize={'30px'} 
                        _hover={{opacity: '80%'}}
                        onClick={() => navigate(`/event/${event.eventID}`)} />
                </Box>
            </Box>
            <Box height={'1px'} background='#C7C9F2' width={'70vw'} />
        </Box>
    )
}

export default EventListItem