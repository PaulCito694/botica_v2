import React, {useMemo, useState} from "react";
import ReactDataTable from 'react-data-table-component'
import {TextField} from "@mui/material";

const FilterComponent = ({ filterText, onFilter }:any) => (
  <TextField
    id="search"
    type="text"
    placeholder="Filtrar por nombre"
    aria-label="Filtrar por nombre"
    value={filterText}
    onChange={onFilter}
  />
);

const DataTable = ({data, columns, filterFunction }:any) => {
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data?.filter((item:any) => filterFunction(item, filterText))

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }
    return <FilterComponent
      onFilter={(e:any) => setFilterText(e.target.value)}
      onClear={handleClear} filterText={filterText}
    />
  }, [filterText, resetPaginationToggle])

  return (
    <ReactDataTable
      title="Lista de Productos"
      columns={columns}
      data={filteredItems}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      fixedHeader
      fixedHeaderScrollHeight="300px"
    />
  )
}

export default DataTable
