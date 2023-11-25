import React, { useRef, useEffect } from 'react'
import { styled} from '@mui/material/styles';
import { List,ListItemButton,ListItemIcon,ListItemText  } from "@mui/material"
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from "@mui/material/Fab";
import DeleteIcon from '@mui/icons-material/Delete';
import CollectionsIcon from '@mui/icons-material/Collections';

import Frame from '../../UserPage/components/Frame'

function UploadImage(props) {

  const drawerWidth = window.innerWidth;
const drawerHeight = 150;

	const [sub , setsub] = React.useState(false)
	const [Error, setError] = React.useState(false)
	const [file , setfile]= React.useState("")
	const [preview , setpreview] = React.useState();

        //for the frame
	const [OP , setOP] = React.useState(true)

	
	const handleC = () => { setfile("") ; setpreview(undefined)}


	const myRef = useRef(null);

const items = [ 
		{ "Name" : 'Profile photo',
		  "Icon"  : " ",
		   onClick : ()=>{console.log("pro")}
		},
		{  "Name" : ' ',
		   "Icon" : <DeleteIcon/>,
		   onClick : ()=>{console.log('delete')}
		}
	]


const handleFile = (event)=>{
setfile(event.target.files[0])
}

const handleUpload = ()=>{

if (file){
// axios.post("/UploadImage", { file : file })
// 	.then((response)=> {
// 	if(response.data.okay){
// 	setsub(true);
// 	setError(false);
// 	setfile(undefined);
// 	console.log("uploading")}
// 	else {
// 	setfile(undefined);
// 	setpreview(undefined)
// 	return
// 	}
console.log('upload mutation')
	

//)
}
}

useEffect(()=>{
if (!file) {
setpreview(undefined)
return
}

const  objectUrl = URL.createObjectURL(file)
setpreview(objectUrl)

return () => URL.revokeObjectURL(objectUrl) 
}, [file])




	
	
	const show = ()=>{
		myRef.current.click();
	}
	

const StyledFab = styled(Fab)({
  position: "absolute",
 // zIndex: 0.5,
  top: "40%",
  left: '2%',
  right: 0,
  margin: "0 auto",
  backgroundColor : "#fff",
  mini : 'true'
 });

	


return(

<Box>
<SwipeableDrawer open={props.OOpen} sx={{width: drawerWidth,
    flexShrink:0,
    '& .MuiDrawer-paper':{width:drawerWidth, height: drawerHeight,
    boxSizing:'border-box'}}}
    variant='temporary'
    anchor='bottom'
    onClose={ 
    props.HandleClose}
    onOpen={()=>{console.log('heyy')} 
    }

>

	<List sx ={{display : "flex" , justifyContent : "space-between"}}>
		{items.map((item,index) => {
	const{ Name, Icon, onClick} = item;
	return (
		<ListItemButton key = {index} onClick = {onClick}>
		<ListItemText primary = {Name}  />
		<ListItemIcon sx = {{color : '#b1b1b1'}}>
		{Icon}
		</ListItemIcon>
		</ListItemButton>
		)})}            
	</List>
      <form  encType = "multipart/form-data">
       <StyledFab  size = 'large'  onClick = {show}   >
        
	<input type = "file" accept = "image/*"  ref = {myRef}  style = {{display : 'none'}} capture  onChange = {handleFile}  />
	
	<CollectionsIcon sx = {{color : '#0080ff'}}  /> 

	</StyledFab>
	</form>
	{file && <Frame source = {preview}  handleclose = {handleC} open = {OP} Upload = {handleUpload} />}

    </SwipeableDrawer>

</Box>	
  )
	


}

export default UploadImage