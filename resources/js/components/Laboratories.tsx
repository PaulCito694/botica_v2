import React from "react";
import Crud from "./Crud";

const Laboratories = ({setOpenLaboratoryModal}:any) => {
  return (
    <Crud
      setOpenModal={setOpenLaboratoryModal}
      url='laboratories'
    />
  )
}

export default Laboratories
