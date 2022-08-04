import { Box, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup, useAuth } from '../../backend/auth'

function SignUp() {
    const currentUser = useAuth() //custom hook to retrieve current user object
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    
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
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleFirstname = (event) => {
        setFirstname(event.target.value)
    }
    const handleLastname = (event) => {
        setLastname(event.target.value)
    }

    return (
        <Box>
            <Input placeholder='Email' onChange={handleEmail} />
            <Input placeholder='Password' type={'password'} onChange={handlePassword} />
            <Input placeholder='First Name' onChange={handleFirstname} />
            <Input placeholder='Last Name' onChange={handleLastname} />
            <Button disabled={loading || currentUser} onClick={handleSignup} >Sign Up</Button>
            <Button disabled={loading || currentUser} onClick={() => navigate('/login')} >Have an Account? Log In here. </Button>
            <Button disabled={loading} onClick={() => navigate('/')} > Back to Landing Page </Button>
        </Box>
    )
}

export default SignUp