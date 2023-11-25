import "./App.css";
import { useEffect, useRef } from "react";
import {
  Outlet,
  ScrollRestoration,
  useLocation
} from "react-router-dom";
import Layout from "./Components/Layouts/components/layout";
import { Box, Container } from "@mui/material";
import Tags from "./utills/tag";
import { useScrollRestoration } from "use-scroll-restoration";

function App() {
  
useScrollRestoration()

 
  
  return (
    
    
    <Box sx={{ overflowY: "scroll" }} >
     
      <Layout>
      
        <Tags />
       

       
        <Container sx={{ marginTop: "110px", overflowY: "scroll" }}  component={"div"} >
       
          <Outlet />
          
        
        </Container>
        
      </Layout>
      
      
    </Box>
    
    
  );
}

export default App;
