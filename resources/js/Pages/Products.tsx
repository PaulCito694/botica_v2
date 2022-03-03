import React, {useState} from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import Laboratories from "../components/Laboratories";
import {Form} from "react-final-form"
import TextFieldField from "../components/fields/TextFieldField";
import AutoCompleteField from "../components/fields/AutoCompleteField";
import useCrud from "../Hooks/useCrud";
import DataTable from "../components/components/DataTable";
import CustomMaterialMenu from "../components/ui/CustomMaterialMenu";
import Button from "../components/fields/Button";
import Add from "@mui/icons-material/Add";

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
    {name: 'Nombre', selector: (row: any) => row.name,},
    {name: 'Ubicacion', selector: (row: any) => row.location,},
    {name: 'Componentes', selector: (row: any) => row.components,},
    {name: 'Precio de compra', selector: (row: any) => row.price_in,},
    {name: 'Precio de venta', selector: (row: any) => row.price_out,},
    {
      name: 'Opciones',
      cell: (row:any) => <CustomMaterialMenu
        size="small"
        row={row}
        onDeleteRow={deleteMutate}
        onUpdateRow={onUpdate}
      />,
      allowOverflow: true,
      button: true,
      width: '56px',
    }
  ]

  const onUpdate = (values:any) => {
    setRecord(values)
  }

  const onSubmit = async (values: any) => {
    try{
      record ? updateMutate(values) : createMutate(values)
      setRecord(null)
    }catch (err){
      console.debug(err)
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
              render={({handleSubmit, values, form: {reset}})=>(
                <form onSubmit={handleSubmit} className='p-4 '>
                  <div className='mb-6 '>
                    <div className='grid grid-cols-3 gap-2 mb-4'>
                      <TextFieldField name='name' label='Nombre'/>
                      <TextFieldField name='components' label='Componentes'/>
                      <AutoCompleteField name='brand_id' label='Marca' data={brands} addButtonClick={setOpenBrandModal}/>
                      <TextFieldField name='location' label='Ubicacion'/>
                      <TextFieldField name='digemid_code' label='Codigo DIGEMID'/>
                      <TextFieldField name='price_out' label='Precio de compra'/>
                      <TextFieldField name='price_in' label='Precio de venta'/>
                      <AutoCompleteField name='laboratory_id' label='Laboratorio' data={laboratories} addButtonClick={setOpenLaboratoryModal}/>
                      <AutoCompleteField name='category_id' label='Categoria' data={categories} addButtonClick={setOpenCategoryModal}/>
                    </div>
                    <div className='flex justify-center mb-4'>
                      <Button label='Crear producto' type='submit' endIcon={<Add/>}/>
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
