import React from 'react'
import {MenuItem, Select, Autocomplete, TextField} from "@mui/material";
import {useField} from "react-final-form";

interface Values {
  name: string;
  label?: string;
  className?:string;
  validate?: any;
  data?:any
}

const AutoCompleteField = ({name, label, className, validate, data}:Values) =>{
  const {input, meta: {error, touched}} = useField(name,{validate})
  return <>
    <label>{label}</label>
    <Autocomplete
      renderInput={(params)=><TextField {...params}/>}
      className={className}
      options={data}
      getOptionLabel={(option) => option.name}
      onChange={(event, value)=>input.onChange(value.id)}
    />
    {touched && error}
  </>
}

export default AutoCompleteField
