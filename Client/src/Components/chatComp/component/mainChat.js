import { Box, InputBase } from '@mui/material'
import React, { useEffect } from 'react'
import ChatTab from './chatTab'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const MainChat = ({tokens}) => {
  const navigate = useNavigate()
  console.log(tokens)
  useEffect(() => {
    if(!tokens){
     return navigate('/get-started/Signin')
    }

    return () => {
      console.log("cleaned up");
    }
  }, [tokens])
  
  return (
    <Box >
<ChatTab/>
<Outlet/>
    </Box>
  )
}

MainChat.propTypes =  {
tokens: PropTypes.string.isRequired 
}

export default MainChat
