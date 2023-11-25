
import myUpper from '../../../utills/caps.jsx'
import { Call, WhatsApp, Verified} from '@mui/icons-material';
import {Box, Card, CardActionArea, CardActions, Typography,CardMedia, CardContent, Button, Avatar, IconButton} from '@mui/material'
import Tab2 from './Tab2.jsx';
import userImage from '../../../assets/userImage.jpg'

const Detail = (props)=>{
    const id = props.id
    const lastname = props.lastname
    const firstname = props.firstname
    const name = props.name
    const Name = name? myUpper(name) : ''
    const  email = props.email
    const Address = props.address
    const typename = props.typename

    return (
        <>
        <Box sx={{display: "flex", justifyContent: "center"}}>
        <Card sx={{maxWidth: 445, minWidth: 345}} elevation={0}>
        <CardActionArea component={'div'}>
        <CardMedia component='img' height = "150px" alt= "user pic" image={userImage}>
        </CardMedia>
        <CardContent>
        <Box sx={{ display: 'flex', flexDirection: "row" ,width:"inherit",justifyContent: "space-between", alignItems: "center", alignContent: "!important space-evenly "}}>
        <Avatar  sx={{marginTop: "-70px", width: "50px", height: "50px", border: "2px solid #fff" }}/> 
        <Box sx={{display: "flex", flexBasis: "60%", justifyContent: "space-between", alignItems: "center"}}>
        <IconButton sx={{ backgroundColor: '#1976d2'}}><WhatsApp className="material-icons" sx={{color:"#fff"}}/></IconButton> <IconButton  sx={{backgroundColor: '#1976d2'}}><Call className="material-icons" sx={{color:"#fff"}}/></IconButton><Typography sx={{fontSize: "14px"}}>{typename}</Typography>
        </Box>
        </Box>
        <Box sx={{display:'flex', paddingTop:'30px'}}>
        <Typography sx={{fontWeight:500, fontSize: 20, paddingBottom: '10px', fontFamily: "sans-serif"}}>
        {Name}
        </Typography>
        <Verified color="primary" fontSize='12px'/>
        </Box>
        <Typography sx={{paddingBottom: '10px'}}>
        <span style={{color: 'grey'}}>Email</span> <br/> 
        <span style={{fontSize : 18}}>{email}</span>
        </Typography>
        <Typography sx={{paddingBottom: '5px'}}>
        <span style={{color: 'grey'}}>Address</span> <br/>
        <span style={{fontSize : 18}}>{Address}</span>
        </Typography>
        
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size = "small" color = "primary">
        Recommend
        </Button>
        </CardActions>
        </Card>
        </Box>
        <Tab2 user_id = {id}/>
        </>
    )
}
export default Detail