import {atom, selector} from 'recoil'
import { stringArray } from './stringToArray';

//const data = () =>{ return stringArray('q')}
export const drawerNav = atom({
    key: 'NavDraw',
    default: false,
  });

  export const chatNav = atom({
    key: 'chatDraw',
    default: false,
  });
  
  export const dashDraw = atom({
    key: 'DashDraw',
    default: false,
  });

  export const photMod = atom({
    key: 'PhotoMod',
    default: false,
  });

  export const userMessage = atom({
    key: 'MessageCreate',
    default: " ",
  });

  export const userNew = atom({
    key: 'NewUser',
    default: null,
  });

  export const userSuccess = atom({
    key: 'UserSucces',
    default: false,
  });


  export const userToken = atom({
    key: "userTokens",
    default: null
  })

  

  export const userData= atom( {
    key: 'userState',
    default: null
  })

  export const token =  selector( {
    key: 'tokenState',
    get: ({get})=>{
      const tok = get(userData);
      if(tok !== null){
        const {username } = tok
        return username
      }
      else
      return tok 
    }
  })

  export const currentUser =  selector( {
    key: 'currState',
    get: ({get})=>{
      const tok = get(userData);
      if(tok !== null){
        const {username, location, phone, skill, firstname, user_id} = tok
        return { username, location, phone, skill, firstname, like_id: user_id}
      }
      else
      return {username:"", location: "", phone: "", skill: "", firstname: ""}
    }
  })

  export const errorM= atom( {
    key: 'errorState',
    default: null
  })

  export const searchIn = atom({
    key: 'searching',
    default: false
  })

  export const anchorEll = atom({
    key: 'anchor',
    default: null
  });

  export const Users = atom({
    key: 'Users',
    default: []
  });

  export const Load = atom({
    key: 'Load',
    default: false
  });

  export const userError = atom({
    key: 'ErrorLoad',
    default: false
  }); 

  export const userTrigger = atom({
    key: 'Trigger',
    default: false
  });

  export const refreshed = atom({
    key: 'Triggers',
    default: false
  });

  export const searchdata = atom({
    key: "searchdata",
    default: []
  })

  export const expand = atom({
    key: "expan",
    default: false
  })

  export const chipsTag = atom({
    key: "chip",
    default: []
  })

  export const chipsTag2 = atom({
    key: "chip2",
    default: stringArray('q')
  })

  export const notfound = atom({
    key: "not",
    default: false
  })

  export const ChipInfo =  selector( {
    key: 'cuState',
    get: ({get})=>{
      
      const tok =  get(chipsTag2);
      if(tok?.length > 0){
        return tok
      }
        return []
      }})

      export const values = atom(
        {
          key: "kll",
          default: ""
        }
      )
      
  export const userList = atom({
    key: "list",
    default: {}
  })

  export const posi = atom({
    key: "position",
    default: sessionStorage.getItem("ScrollPos")
  })
const path =  window.location.pathname.split("/")[2]
  export const useloc = atom({
    key: "jjj",
    default:  "messages" || path
  })

  export const chatMess = atom({
    key:"mainMess",
    default: []
  })