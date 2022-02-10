import React from "react";
import Crud from "./Crud";

const Brands = ({setOpenBrandModal}:any) => {
  return (
    <Crud
      setOpenModal={setOpenBrandModal}
      url='brands'
    />
  )
}

export  default Brands
