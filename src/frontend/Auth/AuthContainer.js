import { Box } from '@chakra-ui/react'
import React from 'react'
import style from './auth.module.css'
import LogIn from './LogIn'
import SignUp from './SignUp'

function AuthContainer ({login}) {


    return (
        <Box className={style.MainBox}>
            {login ? <LogIn /> : <SignUp />}
        </Box>

    )
}

export default AuthContainer