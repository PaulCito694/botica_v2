import DialogCrud from "./DialogCrud";
import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";

const fetchRecords = (url: any) => axios.get(`/admin/${url}`).then(response => response.data)
const createRecord = (values: any, url:any) => axios.post(`/admin/${url}`,values)
const deleteRecord = (id_brand: any, url:any) => axios.delete(`/admin/${url}/${id_brand}`)
const updateRecord = (values: any, url:any) => axios.put(`/admin/${url}/${values.id}`,values)

const Crud = ({setOpenModal, url}:any) => {
  const queryClient = useQueryClient()
  const [record, setRecord]:any = useState(null)
  const {data, status} = useQuery('brands',() => fetchRecords(url), {refetchOnWindowFocus: false})
  const {mutate: deleteMutate}:any = useMutation(['delete', url], (id_brand) => deleteRecord(id_brand, url), {
    onSuccess: () => queryClient.invalidateQueries('brands')
  })
  const {mutate: updateMutate}:any = useMutation(['update', url], (values) => updateRecord(values, url), {
    onSuccess: () => queryClient.invalidateQueries('brands')
  })

  const {mutateAsync: createMutate}:any =  useMutation(['createBrand', url], values => createRecord(values, url),{
    onSuccess: () => queryClient.invalidateQueries('brands')
  })

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
