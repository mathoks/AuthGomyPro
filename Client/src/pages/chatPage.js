import { Box } from '@mui/material'
import React from 'react'
import MainChat from '../Components/chatComp/component/mainChat'

const ChatPage = () => {

  const token = sessionStorage.getItem("token")
  return (
    <Box>
        <MainChat tokens = {token}/>
    </Box>
      
    
  )
}

export default ChatPage
