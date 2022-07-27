import { Box, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { logout, login, signup, useAuth } from './firebase'

function SignUp() {
    const currentUser = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignup = async () => {
        console.log(email, password)
        setLoading(true)
        try {
            await signup(email, password)
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    const handleLogin = async () => {
        console.log(email, password)
        setLoading(true)
        try {
            await login(email, password)
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
        } catch {
            alert("error!")
        }
        setLoading(false)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <Box>
            <Input placeholder='Email' onChange={handleEmail} />
            <Input placeholder='Password' onChange={handlePassword} />
            <Button disabled={loading || currentUser} onClick={handleSignup} >Sign Up</Button>
            <Button disabled={loading || currentUser} onClick={handleLogin}>Log In</Button>
            <Button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</Button>
            <Box >Currently Logged In: {currentUser?.email}</Box>
        </Box>
    )
}

export default SignUp