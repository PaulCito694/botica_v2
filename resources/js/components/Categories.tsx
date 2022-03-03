import React from "react";
import Crud from "./components/Crud";

const Categories = ({setOpenCategoryModal}:any) => {
  return (
    <Crud
      setOpenModal={setOpenCategoryModal}
      url='categories'
    />
  )
}

export default Categories
