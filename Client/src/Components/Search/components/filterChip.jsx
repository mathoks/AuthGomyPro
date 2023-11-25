import * as React from "react";
import { styled } from "@mui/material/styles";
import { Chip, Paper, Box } from "@mui/material";
import { TagFacesRounded } from "@mui/icons-material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChipInfo, chipsTag2 } from "../../../utills/store";
import useForm from "../useform";
import { removeParams } from "../../../utills/urlparams";
import { searchAvatar } from "../../../utills/srtingTocol";
import { memoized1 } from "../helpers/bgmemoized";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const FilterChip = () => {
  const { setchecked } = useForm();
  const chipInfo = useRecoilValue(ChipInfo);
  const setChipData = useSetRecoilState(chipsTag2);

 

  const handleDelete = (chipToDelete) => (e) => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    removeParams(chipToDelete);
    //setchecked(true);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipInfo.map((data, id) => {
          const cache = new Map();

          const key = JSON.stringify(data);
          if (cache.has(key)) {
            return cache.get(key);
          }

          if (!data) return null;
          const icon = data === "React" ? <TagFacesRounded /> : null;

          return (
            <ListItem key={id}>
              <Chip
               // label = {data}
                //sx = {{bgcolor: "#3b82fe"}}
                color="secondary"
                icon={icon}
                {...memoized1(chipInfo)[id]}
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </Box>
  );
};

export default FilterChip;
