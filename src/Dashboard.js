import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()
    const routeToExampleCRUD = () => {
        let path = '/examplecrud'
        navigate(path)
    }
    return (
        <div>
            <h1>Welcome!</h1>
            <Button onClick={routeToExampleCRUD}>Firebase Example Stuff</Button>
        </div>
    )
}

export default Dashboard