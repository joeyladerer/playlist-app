import { Avatar, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/AuxParty_2.png'
import style from './Landing.module.css'

function Landing () {
    // function to navigate with react router
    const navigate = useNavigate()
    const routeToPath = (path) => {
        navigate(path)
    }
    // onClick should be arrow function pointing to a path change
    return (
        <Box className={style.MainBox}>
            <Box className={style.TopContainer}>
                <Box className={style.TopComponentsContainer}>
                    <Avatar src={Logo} marginRight={'5px'} />
                    <Text color={'#C7C9F7'} fontSize={'40px'}>AuxParty</Text>
                </Box>
                <Box className={style.TopComponentsContainer}>
                    <Button 
                        color={'white'} variant={'outline'} borderRadius={'40px'} 
                        marginRight={'20px'} fontSize={'20px'}
                        _hover={{color: '#E7C397'}} _focus={{bg: 'transparent'}}
                        onClick={() => routeToPath('/signup')}>
                            Create Account
                    </Button>
                    <Button 
                        bg={'#E7C397'} color={'white'} borderRadius={'40px'} fontSize={'20px'}
                        _hover={{color: 'black'}}
                        onClick={() => routeToPath('/login')}>
                            Sign In
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Landing