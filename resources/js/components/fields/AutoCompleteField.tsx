import React, {useEffect, useState} from 'react'
import {useField} from "react-final-form";
import CreatableSelect from 'react-select/creatable';
import useCrud from "../../Hooks/useCrud";
import Button from "./Button";
import Add from "@mui/icons-material/Add";

interface Values {
  name: string;
  label?: string;
  className?:string;
  validate?: any;
  data?:any;
  addButtonClick?:any
}

const AutoCompleteField = ({name, label, className, validate, data, addButtonClick}:Values) =>{
  const [value, setValue] = useState(null)
  const {input, meta: {error, touched}} = useField(name,{validate})
  const {createMutate, createStatus} = useCrud('brands')
  const options = [{id: '', name: 'Seleccione una opcion'}, ...data]

  const CreateOption= async (newValue: any)=>{
    const record = await createMutate({name: newValue})
    input.onChange(record.data.id)
    setValue(record.data)
  }
  useEffect(()=>setValue(options.find(((val: { id: any; })=>val.id === input.value)))
  , [input.value])

  return <div className='grid'>
    <label>
      {label}
      {addButtonClick && <Button
        onClick={() => addButtonClick(true)}
        endIcon={<Add/>}
        classes={{endIcon:'!m-0'}}
        className='!ml-2 !mb-2'
      />}
    </label>
    <CreatableSelect
      isClearable
      isDisabled={createStatus === 'loading'}
      onChange={newValue => {
        input.onChange(newValue?.id)
        setValue(newValue)
      }}
      onCreateOption={CreateOption}
      options={options}
      value={value}
      getOptionLabel={item => item.name}
      getOptionValue={item => item.id}
      formatCreateLabel={inputValue => `Crear ${inputValue}`}
    />
    {touched && <span className='text-red-500'>{error}</span>}
  </div>
}

export default AutoCompleteField
