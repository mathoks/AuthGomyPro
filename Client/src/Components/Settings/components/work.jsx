import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Fab, Button, Container } from "@mui/material/";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Description, Work, WorkHistory } from "@mui/icons-material";
import UploadImage from "./UploadImage";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { usePhotoModal } from "../../../hooks/usePhoto";

function Works() {
  const Navi = useNavigate();
  const { isOpen: OPen, handleClose: Close, handleOpen } = usePhotoModal();
  const nam = "";

  const StyledFab = styled(Fab)({
    //position: 'static',

    //bottom: '8%',
    //left: "80%",
    //right: 0,
    // margin: "0 auto",
    backgroundColor: "#fff",
    mini: "true",
  });

  const form = (
    <div key={1}>
      <TextField
        label="Name"
        variant="standard"
        defaultValue={nam}
        helperText="visible for search"
      />
    </div>
  );

  const form0 = (
    <div key={2}>
      <TextField
        label="Description"
        variant="standard"
        multiline
        defaultValue={"description"}
      />
    </div>
  );
  const form1 = (
    <div key={3}>
      <TextField label="experience" variant="standard" defaultValue={2} />
    </div>
  );
  

  const Feat = [
    { tag: form, Icon: <Work /> },
    { tag: form0, Icon: <Description/> },
    { tag: form1, Icon: <WorkHistory /> },
  ];

  return (
    <>
      <Container>
        <Box sx={{ paddingTop: "5px" }}>
          <Typography sx={{ paddingTop: 3 }}>
            Update your work Profile Here
          </Typography>

          <Box>
          <form>
            <List>
              {Feat.map((item, index) => {
                const { tag, Icon } = item;
                return (
                  <Box key={index}>
                    
                      <ListItem
                        sx={{
                          border: "none",
                          m: "4px",
                          backgroundColor: "inherit",
                        }}
                      >
                        <ListItemAvatar>{Icon}</ListItemAvatar>
                        <ListItemText
                          insert="true"
                          primary={tag}
                          primaryTypographyProps={{
                            fontSize: 17,
                            fontWeight: "normal",
                            lineHeight: "20px",
                            mb: "2px",
                            wrap: "break-word",
                            width: "200px",
                            color: "#808080",
                            textOverflow: "[...]",
                            overflow: "clip",
                          }}
                          secondary=""
                          secondaryTypographyProps={{
                            noWrap: true,
                            component: "ul",
                            fontSize: 15,
                            lineHeight: "30px",
                            color: "inherit",
                            display: "block",
                            margin: 0,
                            padding: 0,
                          }}
                          sx={{
                            my: 0,
                            listStyleType: "none",
                          }}
                        />
                      </ListItem>
                      
                    
                    
                  </Box>
                );
              })}
            </List>
            <Button
            disabled={false}
            //className="btn"
            type="submit"
            variant="contained"
            color="primary"
            onClick={console.log("iikk")}
            children="Save"/>
            </form>
          </Box>
          <Box
            sx={{
              ml: "70%",
              display: "flex",
              position: "fixed",
              bottom: "10%",
              right: "4%",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            
            <StyledFab size="large" onClick={handleOpen}>
              <AddAPhotoIcon sx={{ color: "#0080ff" }} />
            </StyledFab>
          </Box>
        </Box>
      </Container>

      {<UploadImage OOpen={OPen} HandleClose={Close} />}
    </>
  );
}

export default Works;
