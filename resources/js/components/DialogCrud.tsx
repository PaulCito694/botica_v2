import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField} from "@mui/material";
import {Form} from "react-final-form";
import TextFieldField from "./TextFieldField";
import {required} from "./Validations";
import DataTable from "react-data-table-component";
import CustomMaterialMenu from "./CustomMaterialMenu";
import React, {useMemo, useState} from "react";

const FilterComponent = ({ filterText, onFilter }:any) => (
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

const DialogCrud = ({
                      setOpenBrandModal,
                      onSubmit,
                      brand,
                      onDelete,
                      onUpdate,
  data
}:any) =>{
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState('')
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


  const filteredItems = data?.filter(
    (item:any) => {
      const names =  item.name?.toLowerCase().includes(filterText.toLowerCase())
      const descriptions = item.description?.toLowerCase().includes(filterText.toLowerCase())
      return names + descriptions
    }
  )
  return (<Dialog
    open={true}
    onClose={() => setOpenBrandModal(false)}
    maxWidth='md'
    fullWidth
  >
    <DialogTitle>Gestion de Marcas</DialogTitle>
    <DialogContent>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          name: brand?brand.name:null,
          description: brand?brand.description:null,
          id: brand?brand.id:null
        }}
        render={({handleSubmit, form: {reset},submitSucceeded,submitFailed}): any => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <TextFieldField name='name' label='Nombre' validate={required()} className='mb-6'/>
                <TextFieldField name='description' label='Descripcion'/>
              </div>
              <Button type="submit" variant='contained'>Guardar</Button>
              <Button variant='outlined' onClick={reset}>Cancelar</Button>
              <Snackbar
                open={submitSucceeded}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                onClose={()=> reset()}
              >
                <Alert severity='success'>Creado correctamente</Alert>
              </Snackbar>
              <Snackbar
                open={submitFailed}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                onClose={()=> reset()}
              >
                <Alert severity='error'>Ocurrio un error con la ultima accion</Alert>
              </Snackbar>
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
                    onDeleteRow={onDelete}
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
  </Dialog>)
}

export default DialogCrud
