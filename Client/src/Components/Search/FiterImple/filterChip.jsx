import * as React from 'react'
import {styled} from '@mui/material/styles'
import { Chip , Paper, Typography} from '@mui/material'
import { TagFacesRounded } from '@mui/icons-material'
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chipsTag, chipsTag2 } from '../../../utills/store';
import useForm from '../useform';


const ListItem = styled('li')(({theme}) =>({
    margin: theme.spacing(0.5),
}));

export const FilterChip = ()=>{
 const filterlist = [{label: 'john'}, {label: "pen"}]   
const chipData= useRecoilValue(chipsTag2)
const setChipdata = useSetRecoilState(chipsTag2)

const {setchecked, checked, handleChecked} = useForm()


const handleDelete = (chipToDelete)=>(e)=>{
    console.log(checked[0])
    
    setChipdata((chip)=> chip.filter((chip) => chip.label !== chipToDelete.label))
    setchecked(true);
 
}

return(
    <Paper
    elevation={0}
    sx={{display: "flex",
    justifyContent: "center",
    flexWrap: "wrap", 
    listStyle: "none",
    p: 0.5,
    m: 0
    }}
    component= "ul"
    >
    
{ chipData.length ? 
    chipData.map((data)=>{
    let icon;
    if(data.label === "React")
    icon = <TagFacesRounded/>;
        if(!data.label)
            return null
    return(
        <ListItem key={data.key}>
            <Chip
                icon={icon}
                label = {data.label}
                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
        </ListItem>
    )
        
}) : <Typography> add filters for refined search</Typography>}
    </Paper>
)
}
