import * as React from 'react';
import {Link, NavLink, Outlet} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} component= {NavLink}/>)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(2),
  paddingTop: "40px",
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

export default function Tab3(props) {
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(newValue)
    };

    //const Tabs = [{Name: "Basic", onClick: ()=>{Navi}}]
  
    return (
        <>
      <Box sx={{ width: '100%', position: "-webkit-sticky !important", top: 40 , zIndex: 2}}>
        <Box sx={{ bgcolor: '#fff', display: "flex" , justifyContent: "center", marginLeft: "0px", width: "100%"}}>
        
          <AntTabs value={value} onChange={handleChange} aria-label="ant example" className={(isActive)=> isActive ? true: false}>
            <AntTab label="Basic" />
            <AntTab label="Work" to = "work"/>
            <AntTab label="Education" to = "education"/>
            
          </AntTabs>
          
        </Box>
      </Box>
      <Outlet/>
    </>
  );
}