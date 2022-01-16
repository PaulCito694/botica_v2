import React from 'react'
import {TextField} from "@mui/material";
import {useField} from "react-final-form";

interface Values {
  name: string;
  label?: string;
}

const TextFieldField = ({name, label}:Values) =>{
  const {input} = useField(name)
  return <TextField {...input} label={label}/>
}

export default TextFieldField
