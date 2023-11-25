import React, {  } from 'react'
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Drawer, List,ListItemButton,ListItemText,Card,CardContent,CardMedia} from "@mui/material"



function Frame(props) {


const drawerWidth = window.innerWidth;
const theme =useTheme();
const HandleClose = props.handleclose;	
const OOpen = props.open
const Source = props.source
const HandleUpload = props.Upload

	const items = [
		{
			"Name" :"Cancel",
			onClick : ()=>{HandleClose()}
		},

		{
			"Name" : "Done",
			onClick : ()=>{HandleUpload()}
		}
	]

	return (
		<Drawer open= {OOpen} sx = {{width : drawerWidth ,flexShrink:0,
    		'& .MuiDrawer-paper':{width:drawerWidth,
    		boxSizing:'border-box',
		backgroundColor : "transparent"}}}
    		variant='temporary'
   	 	anchor='left'
    		onClose={ 
   		props.HandleClose}
    		
    >

		<Card variant = 'raised' sx = {{ width : "60%", height : "50%", margin : "10%" }}>
		<CardContent>
	        <Typography variant = 'caption' >
		Profile Pic Preview
		</Typography>
		</CardContent>
		<Divider/>
		<CardMedia >
		<img alt = "userpic" height = '55%' width = ' 80%' src = {Source} style ={{margin : "2px 2px 4px 23px ", overflow : "scroll"}}/>
		</CardMedia>
		<CardContent>
                 <List sx = {{display : 'flex' , justifyContent :"space-between" }}>
		{items.map((item,index) => {
			const { Name , onClick} = item

			return (
				<ListItemButton key = {index} onClick = {onClick}>
				<ListItemText primary = {Name}/>
				</ListItemButton>
			)})}
		</List>

		</CardContent>
		</Card>


				</Drawer>
	)

}

export default Frame 