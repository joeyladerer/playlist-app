import { Avatar, Box, Button, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import Logo from '../../assets/AuxParty_2.png'
import style from './Landing.module.css'
import SongCard from './SongCard'

import circles from '../../assets/circles.png'
import good4ucover from '../../assets/good4ucover.png'
import getintoit from '../../assets/getintoit.png'
import lessthanzero from '../../assets/lessthanzero.jpeg'
import asitwas from '../../assets/asitwas.png'
import comewithme from '../../assets/comewithme.png'
import LogIn from '../Auth/LogIn'
import SignUp from '../Auth/SignUp'


function Landing () {
    // function to navigate with react router

    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogIn, setShowLogIn] = useState(false)

    const closePopup = () => {
        setShowSignUp(false)
        setShowLogIn(false)
    }

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
                        _hover={{color: '#E7C397', borderColor: '#E7C397'}} _focus={{bg: 'transparent'}}
                        onClick={() => setShowSignUp(true)}>
                            Create Account
                    </Button>
                    <Button 
                        bg={'#E7C397'} color={'white'} borderRadius={'40px'} fontSize={'20px'}
                        _hover={{color: 'black'}} _focus={{background: '#E7C397'}}
                        onClick={() => setShowLogIn(true)}>
                            Sign In
                    </Button>
                </Box>
            </Box>

            <Box className={style.BodyContainer}>
                <Box className={style.DescriptionContainer}>
                    <Box className={style.PlayNowContainer}>
                        <Text>PLAY NOW</Text>
                        <Box marginLeft={'1vw'} width={'15vw'} height={'1px'} background={'white'}/>
                        <Box width={'10px'} height={'10px'} borderWidth={'1px'} borderColor={'white'} borderRadius={'full'} />
                    </Box>
                    <Text className={style.DescriptionText}>Collaborate and blend your music taste blah blah blah</Text>
                    <Button
                        bg={'#150748'} color={'white'} borderRadius={'full'} 
                        width={'210px'} height={'50px'} fontSize={'20px'}
                        _hover={{color: '#E7C397'}} _focus={{background: '#150748'}}
                        onClick={() => setShowSignUp(true)}
                    >Get Started</Button>
                </Box>

                <Wrap width={'750px'} justify='right' position={'fixed'} right={'3vw'}>
                    <WrapItem>
                        <Box marginTop={'14vh'}>
                            <SongCard 
                                width={130} 
                                song='Circles' 
                                artist='Post Malone' 
                                image={circles}
                                timeElapsed='0:44'
                                timeRemaining='2:50'
                                timeBarPosition={0.2}
                            />
                            </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box marginTop={'9vh'} marginLeft={'2vw'}>
                            <SongCard 
                                width={270} 
                                song='good 4 u' 
                                artist='Olivia Rodrigo' 
                                image={good4ucover}
                                timeElapsed='0:58'
                                timeRemaining='1:59'
                                timeBarPosition={0.2}
                            />
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box marginTop={'5vh'} marginLeft={'3vw'}>
                            <SongCard 
                                width={190} 
                                song='Get Into It (Yuh)' 
                                artist='Doja Cat' 
                                image={getintoit}
                                timeElapsed='1:15'
                                timeRemaining='1:02'
                                timeBarPosition={0.45}
                            />
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box marginTop={'-3vh'}>
                            <SongCard 
                                width={150} 
                                song='Less Than Zero' 
                                artist='The Weeknd' 
                                image={lessthanzero}
                                timeElapsed='0:25'
                                timeRemaining='3:05'
                                timeBarPosition={0.15}
                            />
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box marginTop={'3vh'} marginLeft={'2vw'}>
                            <SongCard 
                                width={190} 
                                song='As It Was' 
                                artist='Harry Styles' 
                                image={asitwas}
                                timeElapsed='1:18'
                                timeRemaining='1:28'
                                timeBarPosition={0.52}
                            />
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box marginRight={'2vw'} marginTop={'-15vh'} marginLeft={'3vw'} zIndex={'-1'}>
                            <SongCard 
                                width={270} 
                                song='Come With Me' 
                                artist='Surfaces, salem ilese' 
                                image={comewithme}
                                timeElapsed='2:20'
                                timeRemaining='1:08'
                                timeBarPosition={0.7}
                            />
                        </Box>
                    </WrapItem>
                </Wrap>
                
            </Box>
            {showSignUp ? 
            <SignUp popup={true} closePopup={closePopup} /> 
                : null}
            {showLogIn ? 
            <LogIn popup={true} closePopup={closePopup} /> 
                : null}
            
        </Box>
    )
}

export default Landing