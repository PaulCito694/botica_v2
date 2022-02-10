import React, { useState} from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {Button} from "@mui/material";
import Add from '@mui/icons-material/Add'
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import Laboratories from "../components/Laboratories";
import {Form} from "react-final-form"
import TextFieldField from "../components/TextFieldField";
import SelectField from "../components/SelectField";
import axios from "axios";
import {useQuery} from "react-query";
import AutoCompleteField from "../components/AutoCompleteField";

const fetchBrands = () => axios.get('/admin/brands').then(response => response.data)

export default function Dashboard() {
  const [openBrandModal, setOpenBrandModal]:any = useState(false)
  const [openCategoryModal, setOpenCategoryModal]:any = useState(false)
  const [openLaboratoryModal, setOpenLaboratoryModal]:any = useState(false)
  const {data: brands, status} = useQuery('brands',() => fetchBrands(), {refetchOnWindowFocus: false})

  if (status !== 'success') return null
  return (
    <AppLayout
      title="Catalogo de productos"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Catalogo de productos
          <div>
            <Button variant='contained'
                    onClick={() => setOpenBrandModal(true)}
                    endIcon={<Add/>}
            >
              Marca
            </Button>
            {openBrandModal && <Brands setOpenBrandModal={setOpenBrandModal}/>}
          </div>
          <div>
            <Button variant='contained'
                    onClick={() => setOpenCategoryModal(true)}
                    endIcon={<Add/>}
            >
              Categoria
            </Button>
            {openCategoryModal && <Categories setOpenCategoryModal={setOpenCategoryModal}/>}
          </div>
          <div>
            <Button variant='contained'
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
              onSubmit={() => {null}}
              render={({handleSubmit, values})=>(
                <form onSubmit={handleSubmit} className='p-4 '>
                  <div className='grid grid-cols-3 gap-2'>
                    <TextFieldField name='name' label='Nombre'/>
                    <TextFieldField name='components' label='Componentes'/>
                    <AutoCompleteField name='brand_id' label='Marca' data={brands}/>
                    <TextFieldField name='location' label='Ubicacion'/>
                    <TextFieldField name='digemid_code' label='Codigo DIGEMID'/>
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
