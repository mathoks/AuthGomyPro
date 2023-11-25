import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentUser } from '../../../utills/store'

const Cardmes = ({username, message, timestamp, user_id, show}) => {

    const user = useRecoilValue(currentUser)
    const time = new Date(parseInt(timestamp))
    const Time = time.toLocaleTimeString("en-Us", {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    
    const info = <Stack direction={"row"} spacing={3}  sx={{display: "flex", justifyContent: "space-between"}}>
    <Box >
    <Typography> { user_id === user.like_id || show ? null : `${'~'} ${username}`}</Typography>
    </Box>
    <Box></Box>
    <Box>
    <Typography component={"footer"} sx={{position: "relative", fontSize: "11px", color: "GrayText"}}>{Time}</Typography>
    </Box>
    </Stack>
  return (
    
        <Card sx={{borderTopLeftRadius: 10}}>
        
        <CardHeader title={info} titleTypographyProps={{fontSize: '14px', mt: "0px", pt: "1px", fontWeight: 600, color: "#3b82fe"}} sx={{ pt: 0.5, pb: 0.5}}/>
        
        <CardContent  sx={{pt: 0, pb: 0, mb: 0}}><Typography  children = {message}/></CardContent>
        </Card>
    
  )
}

export default Cardmes
