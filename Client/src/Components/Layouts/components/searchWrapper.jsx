import React, { useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Tune } from "@mui/icons-material";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_SEARCH_RESULT } from "../../../Query/Api";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  chipsTag2,
  expand,
  notfound,
  searchdata,
  values,
} from "../../../utills/store";
import { urlParams } from "../../../utills/urlparams";
import { getParams } from "../../../utills/getParams";
import { stringArray } from "../../../utills/stringToArray";
import { arrayToArray } from "../../../utills/arrayToSring";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: "-5px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const SearchWrapper = ({ setSearching }) => {
  const setexpan = useSetRecoilState(expand);
  const setsearchdata = useSetRecoilState(searchdata);
  const path = useLocation();
  const Navi = useNavigate();
  const searchText = useRef(null);
  const [Val, setVal] = useState(searchText.current?.value);
  const { pathname } = path;
  const setnoInfo = useSetRecoilState(notfound);
  const setChipdata = useSetRecoilState(chipsTag2);

  var query = getParams("q");
  console.log(query);

  const controller = useRef(new AbortController());

  const [fetch, { data = {}, error, loading }] = useLazyQuery(
    GET_SEARCH_RESULT,
    {
      variables: { searchText: arrayToArray(query) },
      fetchPolicy: "cache-and-network",
      context: {
        fetchOptions: {
          signal: controller.current.signal,
        },
      },
    }
  );

  useEffect(() => {
    if (controller.current) {
      controller.current.abort("still typing....");
    }
    controller.current = new AbortController();
  }, [searchText]);

  const openSearch = useCallback(
    (e) => {
     
        Navi("search");
        setSearching(true);
        window.scrollTo(0, 0);
      
    },
    [pathname]
  );

  const handleVal = (e) => {
    searchText.current.value = e.target.value;
    setVal(searchText.current.value);
    urlParams("q", e.target.value);
    const toArray = stringArray(searchText.current.value);
    setChipdata(toArray);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      fetch({ variables: { searchText: arrayToArray(query) } });
    }
  };

  useEffect(() => {
    const { Search = [] } = data;
    if (pathname === "/home") {
      searchText.current.value = " ";
      setVal("");
    }
    if (Search.length > 0) {
      setsearchdata(Search);
      setexpan(false);
    }
    if (loading) {
      setnoInfo(true);
    }

    return () => setnoInfo(false);
  }, [data, fetch, loading, pathname]);

  const toggleActive = () => {
    openSearch();
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Find a service…"
        inputProps={{ "aria-label": "search" }}
        endAdornment={
          pathname === "/search" ? (
            " "
          ) : (
            <IconButton
              sx={{ mr: "8px", p: 0, width: (theme) => theme.spacing(4) }}
              aria-label="fiter-search-result"
              onClick={toggleActive}
              children={<Tune color="primary" />}
            />
          )
        }
        value={Val}
        ref={searchText}
        onChange={handleVal}
        onInput={openSearch}
        onKeyDown={handleKeydown}
        id="hjjj"
        type="search"
      />
    </Search>
  );
};
