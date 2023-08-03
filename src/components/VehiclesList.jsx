import React from 'react'
import VehicleCard from './VehicleCard'

const VehiclesList = ({ vehicles, deleteVehicle, handleClickEdit }) => {
    return (
        <>
        <h1 className='p-4 text-3xl text-center my-6'>Vehicle registration</h1>
        <section className='grid gap-10 my-8 auto-rows-auto grid-cols-[repeat(auto-fill,_300px)] justify-center mx-auto'>
            {
                vehicles.map((vehicle) => <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} deleteVehicle={deleteVehicle} handleClickEdit={handleClickEdit} />)
            }
        </section>
        </>
    )
}

export default VehiclesList
