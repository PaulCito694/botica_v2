import React, {useState} from 'react'
import AppLayout from '@/Layouts/AppLayout'
import Brands from "../components/Brands"
import Categories from "../components/Categories"
import Laboratories from "../components/Laboratories"
import {Form} from "react-final-form
import TextFieldField from "../components/fields/TextFieldField"
import AutoCompleteField from "../components/fields/AutoCompleteField"
import useCrud from "../Hooks/useCrud"
import DataTable from "../components/components/DataTable"
import CustomMaterialMenu from "../components/ui/CustomMaterialMenu"
import Button from "../components/fields/Button"
import Add from "@mui/icons-material/Add"
import {Alert, Snackbar} from "@mui/material"
import {mix, required, isNumber } from "../components/Validations"

const filterFunction = (item:any, filterText: string) => {
  const names =  item.name?.toLowerCase().includes(filterText.toLowerCase())
  const location = item.location?.toLowerCase().includes(filterText.toLowerCase())
  return names + location
}

export default function Dashboard() {
  const [record, setRecord]:any = useState(null)
  const [openBrandModal, setOpenBrandModal]:any = useState(false)
  const [openCategoryModal, setOpenCategoryModal]:any = useState(false)
  const [openLaboratoryModal, setOpenLaboratoryModal]:any = useState(false)
  const {data: brands} = useCrud('brands')
  const {data: laboratories} = useCrud('laboratories')
  const {data: categories} = useCrud('categories')
  const {data: products, status, deleteMutate, updateMutate, createMutate} = useCrud('products')

  const columns = [
    {name: 'Nombre', selector: (row: any) => row.name, width: '300px',},
    {name: 'Codigo', selector: (row: any) => row.code, width: '100px',},
    {name: 'Ubicacion', selector: (row: any) => row.location, width: '100px',},
    {name: 'Componentes', selector: (row: any) => row.components, width: '300px',},
    {name: 'Por Mayor', selector: (row: any) => row.wholesale_price, width: '100px',},
    {name: 'Por Menor', selector: (row: any) => row.retail_price, width: '100px',},
    {name: 'Laboratorio', selector: (row: any) => row.laboratory?.name, width: '200px',},
    {name: 'Categoria', selector: (row: any) => row.category?.name, width: '200px',},
    {name: 'Marca', selector: (row: any) => row.brand?.name, width: '200px',},
    {
      name: 'Opciones',
      cell: (row:any) => <CustomMaterialMenu
        size="small"
        row={row}
        onDeleteRow={(id:any) => {
          if (confirm("Seguro que deseas eliminar el registro?"))
            deleteMutate(id)
        }}
        onUpdateRow={onUpdate}
      />,
      allowOverflow: true,
      button: true,
      width: '55px',
    }
  ]

  const onUpdate = (values:any) => setRecord(values)


  const onSubmit = async (values: any) => {
    try{
      record ? updateMutate(values) : createMutate(values)
      setRecord(null)
    }catch (err){
      //console.debug(err)
    }
  }

  if (status !== 'success') return null
  return (
    <AppLayout
      title="Catalogo de productos"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Catalogo de productos
          {openBrandModal && <Brands setOpenBrandModal={setOpenBrandModal}/>}
          {openCategoryModal && <Categories setOpenCategoryModal={setOpenCategoryModal}/>}
          {openLaboratoryModal && <Laboratories setOpenLaboratoryModal={setOpenLaboratoryModal}/>}
        </h2>
      )}
    >
      <div className="py-12 bg-slate-400">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <Form
              onSubmit={onSubmit}
              initialValues={record}
              render={({handleSubmit, form: {restart},submitSucceeded, submitErrors,submitFailed}): any => (
                <form onSubmit={handleSubmit} className='p-4 '>
                  <div className='mb-6 '>
                    <div className='grid grid-cols-3 gap-2 mb-4'>
                      <TextFieldField name='name' label='Nombre' validate={mix(required())}/>
                      <TextFieldField name='components' label='Componentes'/>
                      <TextFieldField name='location' label='Ubicacion' />
                      <TextFieldField name='digemid_code' label='Codigo DIGEMID'/>
                      <TextFieldField name='wholesale_price' label='Precio por mayor' validate={mix(required(), isNumber())}/>
                      <TextFieldField name='retail_price' label='Precio por menor' validate={mix(required(), isNumber())}/>
                      <AutoCompleteField name='brand_id' label='Marca' data={brands} addButtonClick={setOpenBrandModal} validate={required()}/>
                      <AutoCompleteField name='laboratory_id' label='Laboratorio' data={laboratories} addButtonClick={setOpenLaboratoryModal} validate={required()}/>
                      <AutoCompleteField name='category_id' label='Categoria' data={categories} addButtonClick={setOpenCategoryModal} validate={required()}/>
                    </div>
                    <Snackbar
                      open={submitSucceeded}
                      autoHideDuration={3000}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                      onClose={restart}
                    >
                      <Alert severity='success'>Creado correctamente</Alert>
                    </Snackbar>
                    <Snackbar
                      open={submitFailed}
                      autoHideDuration={3000}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    >
                      <Alert severity='error'>Error al crear producto</Alert>
                    </Snackbar>
                    <div className='flex justify-center mb-4 gap-6'>
                      <Button label='Crear producto' type='submit' endIcon={<Add/>}/>
                      <Button label='Cancelar'  color='warning' onClick={restart}/>
                    </div>
                  </div>
                  <DataTable
                    data={products}
                    columns={columns}
                    filterFunction={filterFunction}
                    className='bg-slate-400'
                  />
                </form>
              )}
            >
            </Form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
