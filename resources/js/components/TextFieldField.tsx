import React from 'react'
import {TextField} from "@mui/material";
import {useField} from "react-final-form";

interface Values {
  name: string;
  label?: string;
  className?:string;
  validate?: any;
}

const TextFieldField = ({name, label, className, validate}:Values) =>{
  const {input, meta: {error, touched}} = useField(name,{validate})
  return <>
    <label>{label}</label>
    <TextField className={className} {...input}/>
    {touched && error}
  </>
}

export default TextFieldField
