import React, {useState} from 'react';
import AppLayout from '@/Layouts/AppLayout';
import DataTable from 'react-data-table-component';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Form} from "react-final-form"
import TextFieldField from "../components/TextFieldField";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {required} from '../components/Validations'
import Add from '@mui/icons-material/Add'

const fetchBrands = () => axios.get('/admin/brands').then(response => response.data)
const createBrand = (values: any) => axios.post('/admin/brands',values)

export default function Dashboard() {
  const {data, status, refetch} = useQuery('brands',fetchBrands)
  const [openBrandModal, setOpenBrandModal]:any = useState(false)
  const {mutate} =  useMutation('createBrand', values => createBrand(values),{
    onSuccess: () => refetch()
  })

  const onSubmitBrands = (values: any) => mutate(values)

  if (status !== 'success') return null
  return (
    <AppLayout
      title="Catalogo de productos"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Catalogo de productos
          <div>
            <Button variant='contained' onClick={() => setOpenBrandModal(true)} endIcon={<Add/>}>Marca</Button>
          </div>
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="grid grid-cols-3 gap-2">
              {openBrandModal && <Dialog open={true} onClose={() => setOpenBrandModal(false)}>
                <DialogTitle>Gestion de Marcas</DialogTitle>
                <DialogContent>
                  <Form
                    onSubmit={onSubmitBrands}
                    render={({handleSubmit}): any => (
                      <>
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 gap-4">
                            <TextFieldField name='name' label='Nombre' validate={required()} className='mb-6'/>
                            <TextFieldField name='description' label='Descripcion'/>
                          </div>
                          <Button type="submit" variant='contained'>Guardar</Button>
                        </form>
                        <DataTable
                          columns={[
                            {name: 'Nombre', selector: (row: any) => row.name,},
                            {name: 'Descripcion', selector: (row: any) => row.description,},
                          ]}
                          data={data}/>
                      </>
                    )}
                  />
                </DialogContent>
                <DialogActions>
                </DialogActions>
              </Dialog>}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
