import { Box, Button, Input, Avatar, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../backend/auth'
import style from './auth.module.css'

import Logo from '../../assets/AuxParty_2.png'

function SignUp({popup=false, closePopup=null}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [loading, setLoading] = useState(false)
    const [allFieldsValid, setAllFieldsValid] = useState(false)

    const navigate = useNavigate()

    function checkFormValidity () {
        if (
            email.includes('@') && email.includes('.') &&
            password.length >= 6 &&
            firstname && lastname
        ) {
            setAllFieldsValid(true)
        } else {
            setAllFieldsValid(false)
        }

    }

    useEffect(() => {
        return checkFormValidity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstname, lastname, email, password])
    
    const handleSignup = async () => {
        console.log(email, password)
        setLoading(true)
        try {
            await signup(email, password, firstname, lastname)        
            navigate('/dashboard')
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }
    
    // handle input fields
    const handleEmail = (event) => {
        setEmail(event.target.value)
        checkFormValidity()
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
        checkFormValidity()
    }
    const handleFirstname = (event) => {
        setFirstname(event.target.value)
        checkFormValidity()
    }
    const handleLastname = (event) => {
        setLastname(event.target.value)
        checkFormValidity()
    }

    return (
        <Box>
            {popup ? 
            <Box width={'100vw'} height={'100vh'} zIndex={4} position={'fixed'} left={'0px'} top={'0px'}
            opacity={.4} background={'black'}
            _hover={{background: 'black'}} 
            onClick={closePopup}
            /> : null}

            <Box className={style.SignupContainer}>

                <Box className={style.LogoContainer}>
                    <Avatar src={Logo} marginRight={'5px'} />
                    <Text color={'black'} fontSize={'40px'}>AuxParty</Text>
                </Box>

                <Box className={style.InputsContainer}>
                    <Text className={style.InputText}>Firstname</Text>
                    <Input onChange={handleFirstname} color={'black'} background={'white'} _focus={{'outineColor': 'transparent'}} height={'45px'} />
                    <Text className={style.InputText}>Lastname</Text>
                    <Input onChange={handleLastname} color={'black'} background={'white'} _focus={{'outineColor': 'transparent'}} height={'45px'} />
                    <Text className={style.InputText}>Email</Text>
                    <Input onChange={handleEmail} color={'black'} background={'white'} _focus={{'outineColor': 'transparent'}} height={'45px'} />
                    <Text className={style.InputText}>Password</Text>
                    <Input type={'password'} onChange={handlePassword} color={'black'} background={'white'} _focus={{'outineColor': 'transparent'}} height={'45px'} />
                </Box>
                
                <Button disabled={loading || !allFieldsValid} onClick={handleSignup}
                    background={'#150748'} width={'400px'} color={'white'} marginTop={'20px'}
                    _hover={{'color': '#E7C397'}} isLoading={loading}
                    >Create Account</Button>

                    <Box className={style.RedirectContainer}>
                    <Text marginRight={'5px'}>Already have an account?</Text>
                    <Button variant={'link'} color={'#4959D5'} disabled={loading} onClick={() => navigate('/login')} >Log In</Button>
                    </Box>
            </Box>
        </Box>
    )
}

export default SignUp