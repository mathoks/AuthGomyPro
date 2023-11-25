import React, { useMemo } from 'react'
import { Avatar, Box,  Stack } from '@mui/material'
import { stringAvatar } from '../../../utills/stringAvatar'
import Cardmes from './card'
import { useRecoilValue } from 'recoil'
import { currentUser } from '../../../utills/store'

const MesegeStack = ({username, message, timestamp, user_id, show}) => {
    const user = useRecoilValue(currentUser)
    const prop = {
        username,
        message,
        timestamp,
        user_id,
        show
    }
    const rep = useMemo(()=>stringAvatar(username, user.like_id, user_id),[username])
   
        
  return (
    
    <Box padding={1}>
    <Stack spacing={2} direction={"row"}>
    {show ? <Box sx={{ml: 5, paddingLeft: 5}}></Box>: <Avatar {...rep} />  }
    <Cardmes {...prop}/>
    </Stack>
    </Box>
  )
}

export default MesegeStack