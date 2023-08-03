import React, { useState } from 'react'

const VehicleCard = ({ vehicle, deleteVehicle, handleClickEdit }) => {
    const [showButtons, setShowButtons] = useState(false);

    const showingButtons = () => {
        setShowButtons(true);
    };

    const hidingButtons = () => {
        setShowButtons(false);
    };


    return (
        <article className="relative rounded-lg bg-white shadow-md p-4 w-[300px] h-[400px] border-[1px] border-transparent hover:border-primary-color hover:shadow-2xl"
        onMouseEnter={showingButtons}
        onMouseLeave={hidingButtons}
        >
            <img
                src={ vehicle.image ? vehicle.image : "./images/no-image-available.jpeg"} alt="Vehicle image"
                className={`absolute top-0 left-0 w-full object-cover rounded-lg transition-opacity duration-300 ${
                showButtons ? "opacity-50" : "opacity-100"
                }`}
            />

            <div
                className={`${
                showButtons ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 absolute top-0 left-0 w-full h-full flex justify-center items-center z-10`}
            >
                <div className="flex flex-col justify-center gap-3 text-xl">
                    <button onClick={() => handleClickEdit(vehicle)}
                    className="bg-secondary-color text-white rounded-md px-4 py-2 mr-2 w-32 hover:bg-white hover:text-secondary-color hover:shadow-md hover:shadow-secondary-color">
                        Update
                    </button>
                    <button onClick={() => deleteVehicle(vehicle.vehicleId)}
                    className="bg-primary-color text-white rounded-md px-4 py-2 w-32 hover:bg-white hover:text-primary-color hover:shadow-sm hover:shadow-primary-color">
                        Sell
                    </button>
                </div>
            </div>

            <div
                className={`${
                showButtons ? "opacity-20" : "opacity-100"
                } transition-opacity duration-300 absolute bottom-0 left-0 w-full px-3 py-2 bg-white rounded-b-lg overflow-hidden`}
            >
                <div className='flex items-center justify-between mb-3'>
                    <h2 className="text-2xl text-primary-color font-bold my-2 text-center truncate capitalize">{vehicle.model}
                    </h2>

                    <h3 className='font-semibold text-2xl text-secondary-color ml-3'>${vehicle.price}
                        </h3>
                </div>
                

                <p className="text-gray-500 text-sm mb-2 truncate capitalize">
                <strong>Type:</strong> {vehicle.type}
                </p>

                <p className="text-gray-500 text-sm mb-2 truncate capitalize">
                <strong>Color:</strong> {vehicle.color}
                </p>

                <p className="text-gray-500 text-sm mb-2 truncate">
                <strong>Mileage:</strong> {vehicle.mileage} Km/h
                </p>

                <p className="text-gray-500 text-sm mb-2 truncate capitalize">
                <strong>Condition:</strong> {vehicle.condition}
                </p>

                <p className="text-gray-500 text-sm mb-2 truncate">
                <strong>Cylinder capacity: </strong>{vehicle.cylinderCapacity ? vehicle.cylinderCapacity : "No apply" }
                </p>

                <p className="text-gray-500 text-sm mb-2 truncate">
                <strong>Speeds: </strong>{vehicle.speeds ? vehicle.speeds : "No apply" }
                </p>
            </div>
        </article>
    )
}

export default VehicleCard
