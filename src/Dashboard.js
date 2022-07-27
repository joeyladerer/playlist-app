import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()
    const routeToPath = (path) => {
        navigate(path)
    }
    
    return (
        <div>
            <h1>Welcome!</h1>
            <Button onClick={() => routeToPath('exampleCRUD')}>Firebase Example Stuff</Button>
            <Button onClick={() => routeToPath('/signup')}>Sign up</Button>
        </div>
    )
}

export default Dashboard