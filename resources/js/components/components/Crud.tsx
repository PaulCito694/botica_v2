import DialogCrud from "../ui/DialogCrud";
import React, {useState} from "react";
import useCrud from "../../Hooks/useCrud";

const Crud = ({setOpenModal, url}:any) => {
  const {data, status, deleteMutate, updateMutate, createMutate} = useCrud(url)
  const [record, setRecord]:any = useState(null)

  const onUpdate = (values:any) => setRecord(values)

  const onSubmit = async (values: any) => {
    try{
      record ? updateMutate(values) : createMutate(values)
      setRecord(null)
    }catch (err){
      console.debug(err)
    }
  }
  if (status !== 'success') return null

  return (<DialogCrud
      onDelete={deleteMutate}
      brand={record}
      onSubmit={onSubmit}
      setOpenBrandModal={setOpenModal}
      onUpdate={onUpdate}
      data={data}
    />
  )
}

export  default Crud
