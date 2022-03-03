import React, {useMemo, useState} from "react";
import ReactDataTable from 'react-data-table-component'
import {TextField} from "@mui/material";

const customStyles = {
  header: {
    style: {
      minHeight: '56px'
    },
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      //borderTopColor: defaultThemes.default.divider.default,
      backgroundColor: '#e4d9d6'
    },
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        //borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        //borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
};

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
      customStyles={customStyles}
    />
  )
}

export default DataTable
