import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Fab, Button, Container } from "@mui/material/";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
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
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useRecoilValue } from "recoil";
import { currentUser } from "../../../utills/store";
import { usePhotoModal } from "../../../hooks/usePhoto";
import Tab3 from "./tab3";

function Basic() {
  const Navi = useNavigate();
  const { isOpen: OPen, handleClose: Close, handleOpen } = usePhotoModal();
  const { username, location, phone, skill, firstname } =
    useRecoilValue(currentUser);
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
        label="Firstname"
        variant="standard"
        defaultValue={nam}
        helperText="visible for search"
      />
    </div>
  );

  const form0 = (
    <div key={2}>
      <TextField
        label="Lastname"
        variant="standard"
        defaultValue={firstname}
      />
    </div>
  );
  const form1 = (
    <div key={3}>
      <TextField label="Username" variant="standard" defaultValue={username} />
    </div>
  );
  const form2 = (
    <div key={4}>
      <TextField label="Location" variant="standard" defaultValue={location} />
    </div>
  );
  const form3 = (
    <div key={5}>
      {" "}
      <TextField label="Skill" variant="standard" defaultValue={skill} />
    </div>
  );
  const form4 = (
    <div key={6}>
      {" "}
      <TextField label="Phone" variant="standard" defaultValue={phone} />
    </div>
  );

  const form5 = (
    <div key={7}>
      <TextField
        label="Shout out"
        variant="standard"
        defaultValue={firstname}
      />
    </div>
  );

  const Feat = [
    { tag: form, Icon: <PersonIcon /> },
    { tag: form0, Icon: <PersonIcon /> },
    { tag: form1, Icon: <PersonIcon /> },
    { tag: form2, Icon: <PlaceIcon /> },
    { tag: form3, Icon: <WorkIcon /> },
    { tag: form4, Icon: <ContactPhoneIcon /> },
    { tag: form5, Icon: <CampaignIcon /> },
  ];

  return (
    <>
      <Container>
        <Box sx={{ paddingTop: "5px" }}>
          <Typography sx={{ paddingTop: 3 }}>
            Welcome to Your dashboard you can Update your Profile Here
          </Typography>

          <Box>
            <List>
              {Feat.map((item, index) => {
                const { tag, Icon } = item;
                return (
                  <Box key={index}>
                    <form>
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
                    </form>{" "}
                  </Box>
                );
              })}
            </List>
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
            <Button>Save</Button>
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

export default Basic;
