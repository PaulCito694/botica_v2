import React from 'react';
import Welcome from '@/Jetstream/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import {Button, Select, TextField} from "@mui/material";
import {Form, Field} from "react-final-form"
import TextFieldField from "../components/TextFieldField";
import { Inertia } from '@inertiajs/inertia'

export default function Dashboard() {

  const onSubmitMarks = (values: any) =>{
    Inertia.post('brands', values)
  }
  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="grid grid-cols-3 gap-2">
              <Form
                onSubmit={onSubmitMarks}
                render={({handleSubmit}):any=>(
                  <form onSubmit={handleSubmit}>
                    <TextFieldField name='name' label='Nombre'/>
                    <TextFieldField name='description' label='Descripcion'/>
                    <Button type="submit">Guardar</Button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
