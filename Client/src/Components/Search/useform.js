import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { urlParams } from "../../utills/urlparams";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chipsTag2 } from "../../utills/store";
import { removeParams } from "../../utills/urlparams";

// ******************************
const useForm = () => {
  const [state, setState] = useState();
  const [checked, setchecked] = useState([false, false, false, false]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  const setChip = useSetRecoilState(chipsTag2);
  const prev = useRecoilValue(chipsTag2);
  const pathname = useLocation();
  console.log(pathname);
  const serialize = (vari, q) => {
    return Object.assign({}, { [q]: vari });
  };

  // ******************************
  const handleChecked = (e) => {
    const { value, id } = e.target;
    if (id === "student") {
      setchecked([e.target.checked, checked[1], checked[2], checked[3]]);
      if (!checked[0]) {
        urlParams("cat", value);
        setChip([...prev, { label: value, key: 0 }]);
        setState({ ...state, cat: value });
        console.log(state)
      }
      if (checked[0]) {
        delete state.cat;
        removeParams('cat')
        setChip((prevs) => prevs.filter((en) => en.key !== 0));
      }
    }
    if (id === "graduate") {
      setchecked([checked[0], e.target.checked, checked[2], checked[3]]);
      if (!checked[1]) {
        urlParams("cat2", value);
        
        setChip([...prev, { label: value, key: 1 }]);
        setState({ ...state, cat2: value });
      }

      if (checked[1]) {
        delete state.cat;
        removeParams('cat2')
        setChip((prevs) => prevs.filter((en) => en.key !== 1));
      }
    }
    if (id === "artisan") {
      setchecked([checked[0], checked[1], e.target.checked, checked[3]]);
      if (!checked[2]) {
        urlParams("cat3", value);
        setChip([...prev, { label: value, key: 2 }]);
        setState({ ...state, cat3: value });
        console.log(state)
      }
      if (checked[2]) {
        delete state.cat;
        removeParams('cat3')
        setChip((prevs) => prevs.filter((en) => en.key !== 2));
      }
    }
    if (id === "proffesional") {
      setchecked([checked[0], checked[1], checked[2], e.target.checked]);
      if (!checked[3]) {
        urlParams("cat4", value);
        setChip([...prev, { label: value, key: 3 }]);
        return setState({ ...state, cat4: value });
      }
      if (checked[3]) {
        delete state.cat;
        removeParams('cat4')
        setChip((prevs) => prevs.filter((en) => en.key !== 3));
      }
    }
  };
  // ******************************
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);

    urlParams(name, value)
    // setState(() => ({
    //   ...state,
    //   [name]: value,
    // }));

   // console.log(state);
  };

  // ******************************

  // ******************************
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);
  };

  return {
    handleChange,
    handleSubmit,
    state,
    handleChecked,
    checked,
    setchecked,
    isSubmited,
  };
};

export default useForm;
