import React, {useMemo, useState} from 'react';
import AppLayout from '@/Layouts/AppLayout';
import DataTable from 'react-data-table-component';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Form} from "react-final-form"
import TextFieldField from "../components/TextFieldField";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {required} from '../components/Validations'
import Add from '@mui/icons-material/Add'
import CustomMaterialMenu from "../components/CustomMaterialMenu";

const fetchBrands = () => axios.get('/admin/brands').then(response => response.data)
const createBrand = (values: any) => axios.post('/admin/brands',values)
const deleteBrand = (id_brand: any) => axios.delete(`/admin/brands/${id_brand}`)
const updateBrand = (values: any) => axios.put(`/admin/brands/${values.id}`,values)
const FilterComponent = ({ filterText, onFilter, onClear }:any) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar por nombre"
      aria-label="Filtrar por nombre"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

export default function Dashboard() {
  const {data, status, refetch} = useQuery('brands',fetchBrands)
  const [openBrandModal, setOpenBrandModal]:any = useState(false)
  const [brand, setBrand]:any = useState(null)
  const {mutate: createBrandMutate}:any =  useMutation('createBrand', values => createBrand(values),{
    onSuccess: () => refetch()
  })
  const {mutate: deleteBrandMutate}:any = useMutation('deleteBrand', (id_brand) => deleteBrand(id_brand), {
    onSuccess: () => refetch()
  })
  const {mutate: updateBrandMutate}:any = useMutation('updateBrand', (values) => updateBrand(values), {
    onSuccess: () => refetch()
  })
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data?.filter(
    (item:any) => {
      const names =  item.name.toLowerCase().includes(filterText.toLowerCase())
      const descriptions = item.description.toLowerCase().includes(filterText.toLowerCase())
      return names + descriptions
    }
  )
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent onFilter={(e:any) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    )
  }, [filterText, resetPaginationToggle])

  const onUpdate = (values:any) =>{
    setBrand(values)
  }

  const onSubmitBrands = (values: any) => {
    brand ? updateBrandMutate(values) : createBrandMutate(values)
    setBrand(null)
    refetch()
  }

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
              {openBrandModal && <Dialog
                open={true}
                onClose={() => setOpenBrandModal(false)}
                maxWidth='md'
                fullWidth
              >
                <DialogTitle>Gestion de Marcas</DialogTitle>
                <DialogContent>
                  <Form
                    onSubmit={onSubmitBrands}
                    initialValues={{
                      name: brand?.name,
                      description: brand?.description,
                      id: brand?.id
                      }}
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
                          title="Lista de Marcas"
                          columns={[
                            {name: 'Nombre', selector: (row: any) => row.name,},
                            {name: 'Descripcion', selector: (row: any) => row.description,},
                            {
                              cell: (row:any) => <CustomMaterialMenu
                                size="small"
                                row={row}
                                onDeleteRow={deleteBrandMutate}
                                onUpdateRow={onUpdate}
                              />,
                              allowOverflow: true,
                              button: true,
                              width: '56px',
                            }
                          ]}
                          data={filteredItems}
                          pagination
                          subHeader
                          subHeaderComponent={subHeaderComponentMemo}
                          fixedHeader
                          fixedHeaderScrollHeight="300px"
                        />
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
