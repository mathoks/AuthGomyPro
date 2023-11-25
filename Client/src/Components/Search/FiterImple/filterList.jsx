import * as React from "react";
import {
  Typography,
  Accordion,
  Checkbox,
  Box,
  AccordionSummary,
  AccordionDetails,
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
//import {ExpandMoreIcon, TuneOutlined} from '@mui/icons-material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TuneOutlined } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { Form } from "react-router-dom";
import useForm from "../useform";
import { useSearch } from "../hooks/useSearch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { expand, notfound, searchdata } from "../../../utills/store";
import { getParams } from "../../../utills/getParams";
import { useLazyQuery } from "@apollo/client";
import { GET_SEARCH_RESULT } from "../../../Query/Api";
//import Accordion from "@mui/material/Accordion";

export const MyFilter = () => {
  const setsearchdata = useSetRecoilState(searchdata);
  const [stata, setstata] = React.useState({});
  const [cats, setcats] = React.useState(null);
  const [expan, setexpan] = useRecoilState(expand);
  const [list, setlist] = React.useState("");
  const [Notfound, setNotFound] = useRecoilState(notfound)

  var query = getParams("q");
  //const {submit, data = {}} = useSearch(list)
  const [submit, { data = {}, error, loading }] = useLazyQuery(
    GET_SEARCH_RESULT,
    {
      variables: {
        searchText: query,
        filterText: list.replace(/\bnull\b/g, ""),
      },
      //fetchPolicy: "cache-first",
    }
  );
  console.log(data);
  const { handleChange, handleChecked, state, checked } = useForm();
  const { Search = [] } = data;

  React.useEffect(() => {
    console.log(data);

    if (Search?.length) {
      setsearchdata(Search);
      setexpan(false);
    }
    if(!Search.length)
    setNotFound("Opps....not found")
  }, [data]);

  React.useEffect(() => {
    if (state) setstata(state);
  }, [state]);

  const handleSubmit = () => {
    setlist(
      `${getParams("cat")} ${getParams("cat2")} ${getParams(
        "cat3"
      )} ${getParams("cat4")} ${getParams("name")} ${getParams(
        "skill"
      )} ${getParams("username")} ${getParams("city")} ${getParams("state")}`
    );

    submit();
  };

  return (
    <Accordion expanded={expan} elevation={0} sx={{ ml: "-12px" }}>
      <AccordionSummary
        expandIcon={
          <Button disableTouchRipple onClick={() => setexpan((prev) => !prev)}>
            <ExpandMoreIcon />
          </Button>
        }
        arial-controls="panel1a-content"
      >
        <Stack direction="row" spacing={2}>
          <TuneOutlined />
          <Typography sx={{ flexShrink: 0 }}>Filter</Typography>
        </Stack>
      </AccordionSummary>{" "}
      <AccordionDetails>
        <Stack spacing={4}>
          <Box>
            <FormControl component="fieldset">
              <FormLabel sx={{ marginLeft: 9 }} component="legend">
                {" "}
                Category
              </FormLabel>
              <FormGroup aria-label="checkboxes">
                <FormControlLabel
                  label="Student"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      value={checked[0] ? null : "Student"}
                      id="student"
                      checked={checked[0]}
                      onChange={handleChecked}
                      sx={{
                        color: blue[800],
                        "&.Mui-checked": {
                          color: blue[800],
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Graduate"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      value={checked[1] ? null : "Graduate"}
                      checked={checked[1]}
                      onChange={handleChecked}
                      id="graduate"
                      sx={{
                        color: blue[800],
                        "&.Mui-checked": {
                          color: blue[800],
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Artisan"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      value={checked[2] ? null : "Artisan"}
                      id="artisan"
                      checked={checked[2]}
                      onChange={handleChecked}
                      sx={{
                        color: blue[800],
                        "&.Mui-checked": {
                          color: blue[800],
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Proffesional"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      value={checked[3] ? null : "Professional"}
                      onChange={handleChecked}
                      id="proffesional"
                      checked={checked[3]}
                      sx={{
                        color: blue[800],
                        "&.Mui-checked": {
                          color: blue[800],
                        },
                      }}
                    />
                  }
                />
                <Stack sx={{ paddingTop: 5 }} spacing={0.5}>
                  <FormControlLabel
                    control={
                      <TextField
                        onChange={handleChange}
                        value={state?.name}
                        name="name"
                        inputProps={{
                          placeholder: "filter by name",
                          style: { padding: 15 },
                        }}
                        variant="standard"
                      />
                    }
                    label="Name:"
                    labelPlacement="start"
                  ></FormControlLabel>
                  <FormControlLabel
                    control={
                      <TextField
                        onChange={handleChange}
                        value={state?.username}
                        name="username"
                        inputProps={{
                          placeholder: "filter by username",
                          style: { padding: 15 },
                        }}
                        variant="standard"
                      />
                    }
                    label="Username:"
                    labelPlacement="start"
                  ></FormControlLabel>
                  <FormControlLabel
                    control={
                      <TextField
                        onChange={handleChange}
                        value={state?.skill}
                        name="skill"
                        inputProps={{
                          placeholder: "filter by skill",
                          style: { padding: 15 },
                        }}
                        variant="standard"
                      />
                    }
                    label="Skill:"
                    labelPlacement="start"
                  ></FormControlLabel>
                  <FormControlLabel
                    control={
                      <TextField
                        onChange={handleChange}
                        value={state?.state}
                        name="state"
                        inputProps={{
                          placeholder: "filter by state",
                          style: { padding: 15 },
                        }}
                        variant="standard"
                      />
                    }
                    label="State:"
                    labelPlacement="start"
                  ></FormControlLabel>
                  <FormControlLabel
                    control={
                      <TextField
                        onChange={handleChange}
                        value={state?.city}
                        name="city"
                        inputProps={{
                          placeholder: "filter by city",
                          style: { padding: 15 },
                        }}
                        variant="standard"
                      />
                    }
                    label="City:"
                    labelPlacement="start"
                  ></FormControlLabel>
                </Stack>
              </FormGroup>
            </FormControl>
          </Box>

          <Button
            onClick={handleSubmit}
            sx={{ padding: 1, width: 100, fontSize: 10 }}
            variant="contained"
          >
            Apply filter
          </Button>
        </Stack>
      </AccordionDetails>{" "}
    </Accordion>
  );
};
