import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const SearchInput = ({ value = [], items = [], setInputValue, setValue, setItems }) => {

    const unique = () => {
        let result = []
        items.map(v => {
            let isUnique = true
            value.map(e => {
                if (v._id === e._id) {
                    isUnique = false
                }
                return console.log();
            })
            if (isUnique) { result.push(v) }
            return console.log();
        })
        return [...result, ...value];
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setInputValue("")
                setItems([])
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="searchInput"
            options={unique()}
            multiple
            getOptionLabel={(option) => option.username}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => <TextField {...params} label="Select reciepents" variant="standard" />}
        />
    )
}

export default SearchInput