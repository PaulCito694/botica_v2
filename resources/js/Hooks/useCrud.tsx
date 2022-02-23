import {useMutation, useQuery, useQueryClient} from "react-query";
import React from "react";
import axios from "axios";

const fetchRecords = (url: any) => axios.get(`/admin/${url}`).then(response => response.data)
const createRecord = (values: any, url:any) => axios.post(`/admin/${url}`,values)
const deleteRecord = (id_brand: any, url:any) => axios.delete(`/admin/${url}/${id_brand}`)
const updateRecord = (values: any, url:any) => axios.put(`/admin/${url}/${values.id}`,values)

const useCrud = (url: any) => {
  const queryClient = useQueryClient()

  const {data, status} = useQuery(['records', url],() => fetchRecords(url), {refetchOnWindowFocus: false})
  const {mutate: deleteMutate}:any = useMutation(['delete', url], (id_brand) => deleteRecord(id_brand, url), {
    onSuccess: () => queryClient.invalidateQueries(['records', url])
  })
  const {mutate: updateMutate}:any = useMutation(['update', url], (values) => updateRecord(values, url), {
    onSuccess: () => queryClient.invalidateQueries(['records', url])
  })

  const {mutateAsync: createMutate}:any =  useMutation(['create', url], values => createRecord(values, url),{
    onSuccess: () => queryClient.invalidateQueries(['records', url])
  })

  return {deleteMutate, updateMutate, createMutate, data, status}
}

export default useCrud
