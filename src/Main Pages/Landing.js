import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing () {
    // function to navigate with react router
    const navigate = useNavigate()
    const routeToPath = (path) => {
        navigate(path)
    }
    // onClick should be arrow function pointing to a path change
    return (
        <div>
            <h1>Welcome!</h1>
            <Button onClick={() => routeToPath('exampleCRUD')}>Firebase Example Stuff</Button>
            <Button onClick={() => routeToPath('/signup')}>Sign up</Button>
        </div>
    )
}

export default Landing