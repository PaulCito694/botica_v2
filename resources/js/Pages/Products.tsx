import React, {useState} from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {Button} from "@mui/material";
import Add from '@mui/icons-material/Add'
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import Laboratories from "../components/Laboratories";
import {Form} from "react-final-form"
import TextFieldField from "../components/TextFieldField";
import AutoCompleteField from "../components/AutoCompleteField";
import useCrud from "../Hooks/useCrud";
import DataTable from "../components/DataTable";
import CustomMaterialMenu from "../components/CustomMaterialMenu";

const filterFunction = (item:any, filterText: string) => {
  const names =  item.name?.toLowerCase().includes(filterText.toLowerCase())
  //const descriptions = item.description?.toLowerCase().includes(filterText.toLowerCase())
  return names// + descriptions
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
    {name: 'ubicacion', selector: (row: any) => row.location,},
    {name: 'Componentes', selector: (row: any) => row.components,},
    {name: 'Precio de compra', selector: (row: any) => row.price_in,},
    {name: 'Precio de venta', selector: (row: any) => row.price_out,},
    {
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
  return (
    <AppLayout
      title="Catalogo de productos"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Catalogo de productos
          <div>
            <Button
              variant='contained'
              onClick={() => setOpenBrandModal(true)}
              endIcon={<Add/>}
            >
              Marca
            </Button>
            {openBrandModal && <Brands setOpenBrandModal={setOpenBrandModal}/>}
          </div>
          <div>
            <Button
              variant='contained'
              onClick={() => setOpenCategoryModal(true)}
              endIcon={<Add/>}
            >
              Categoria
            </Button>
            {openCategoryModal && <Categories setOpenCategoryModal={setOpenCategoryModal}/>}
          </div>
          <div>
            <Button
              variant='contained'
              onClick={() => setOpenLaboratoryModal(true)}
              endIcon={<Add/>}
            >
              Laboratorio
            </Button>
            {openLaboratoryModal && <Laboratories setOpenLaboratoryModal={setOpenLaboratoryModal}/>}
          </div>
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <Form
              onSubmit={onSubmit}
              render={({handleSubmit, values})=>(
                <form onSubmit={handleSubmit} className='p-4 '>
                  <div className='grid grid-cols-3 gap-2'>
                    <TextFieldField name='name' label='Nombre'/>
                    <TextFieldField name='components' label='Componentes'/>
                    <AutoCompleteField name='brand_id' label='Marca' data={brands}/>
                    <TextFieldField name='location' label='Ubicacion'/>
                    <TextFieldField name='digemid_code' label='Codigo DIGEMID'/>
                    <TextFieldField name='price_out' label='Precio de compra'/>
                    <TextFieldField name='price_in' label='Precio de venta'/>
                    <AutoCompleteField name='laboratory_id' label='Laboratorio' data={laboratories}/>
                    <AutoCompleteField name='category_id' label='Categoria' data={categories}/>
                    <Button type='submit'>Crear producto</Button>
                  </div>
                  <div>
                    <DataTable
                      data={products}
                      columns={columns}
                      filterFunction={filterFunction}
                    />
                  </div>
                  <pre>{JSON.stringify(values,0,2)}</pre>
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
