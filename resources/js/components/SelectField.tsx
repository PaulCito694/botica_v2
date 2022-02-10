import React from 'react'
import {MenuItem, Select} from "@mui/material";
import {useField} from "react-final-form";

interface Values {
  name: string;
  label?: string;
  className?:string;
  validate?: any;
  data?:any
}

const SelectField = ({name, label, className, validate, data}:Values) =>{
  const {input, meta: {error, touched}} = useField(name,{validate})
  return <div>
    <label>{label}</label>
    <Select className={className} {...input}>
      <MenuItem value=''>Seleccione una opcion</MenuItem>
      {data?.map((item:any, index:number)=> <MenuItem key={index} value={item?.id}>{item?.name}</MenuItem>)}
    </Select>
    {touched && error}
  </div>
}

export default SelectField
