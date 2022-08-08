import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Input, Text } from '@chakra-ui/react'
import { login } from '../../backend/auth'
import { useNavigate } from 'react-router-dom'
import style from './auth.module.css'

import Logo from '../../assets/AuxParty_2.png'

function LogIn ({popup=false, closePopup=null}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [allFieldsValid, setAllFieldsValid] = useState(false)

    const navigate = useNavigate()

    function checkFormValidity () {
        if (
            email.includes('@') && email.includes('.') &&
            password.length >= 6
        ) {
            setAllFieldsValid(true)
        } else {
            setAllFieldsValid(false)
        }

    }

    useEffect(() => {
        return checkFormValidity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password])

    const handleLogin = async () => {
        setLoading(true)
        try {
            await login(email, password)
        } catch {
            alert("Error!")
        }
        setLoading(false)
        navigate('/dashboard')
    }

    // handle input fields
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <Box>
            {popup ? 
            <Box width={'100vw'} height={'100vh'} zIndex={4} position={'fixed'} left={'0px'} top={'0px'}
            opacity={.4} background={'black'}
            _hover={{background: 'black'}}
            onClick={closePopup}
            /> : null}
            <Box className={style.LoginContainer}>

                <Box className={style.LogoContainer}>
                    <Avatar src={Logo} marginRight={'5px'} />
                    <Text color={'black'} fontSize={'40px'}>AuxParty</Text>
                </Box>

                <Box className={style.InputsContainer}>
                    <Text className={style.InputText}>Email</Text>
                    <Input onChange={handleEmail} color={'black'} background={'white'} _focus={{'outineColor': 'transparent'}} height={'45px'} />
                    <Text className={style.InputText}>Password</Text>
                    <Input type={'password'} onChange={handlePassword} color={'black'} background={'white'} _focus={{'outineColor': 'transparent'}} height={'45px'} />
                </Box>
                
                <Button disabled={loading || !allFieldsValid} onClick={handleLogin}
                    background={'#150748'} width={'400px'} color={'white'} marginTop={'20px'}
                    _hover={{'color': '#E7C397'}} isLoading={loading}
                 >Log In</Button>

                 <Box className={style.RedirectContainer}>
                    <Text marginRight={'5px'}>Don't have an account? </Text>
                    <Button variant={'link'} color={'#4959D5'} disabled={loading} onClick={() => navigate('/signup')} >Create Account</Button>
                 </Box>

            </Box>
        </Box>
    )
}

export default LogIn