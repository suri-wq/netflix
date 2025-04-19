import React from 'react'
import './LoginPage.style.css'
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
const LoginPage = () => {
  return (
    <Container className='login-wrap'>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />

    </Container>
  )
}

export default LoginPage