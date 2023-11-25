import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Send } from "@mui/icons-material";
export const SendMes = (props) => {
  const StyledFab = styled(Fab)({
    margin: "0 auto",
    color: "#3b82f",
    mini: "true",
  });

  return (
    <StyledFab size="large" color="primary" onClick={props.okay}>
      <Send sx={{ color: "#fff" }} />
    </StyledFab>
  );
};
