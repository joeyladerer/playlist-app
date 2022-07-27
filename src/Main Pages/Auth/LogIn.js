import React, { useState } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { login } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function LogIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async () => {
        console.log(email, password)
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
            <Input placeholder='Email' onChange={handleEmail} />
            <Input placeholder='Password' type={'password'} onChange={handlePassword} />
            <Button disabled={loading} onClick={handleLogin} >Log In</Button>
            <Button disabled={loading} onClick={() => navigate('/signup')} >Don't have an account? Click Here. </Button>
            <Button disabled={loading} onClick={() => navigate('/')} > Back to Landing Page </Button>
        </Box>
    )
}

export default LogIn