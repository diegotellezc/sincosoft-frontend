import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "./constants.js"
import ModalToRegister from "./components/ModalToRegister.jsx"
import Header from "./components/Header"
import { useForm } from "react-hook-form"
import VehiclesList from "./components/VehiclesList.jsx"
import Swal from 'sweetalert2'
import Footer from "./components/Footer"
import './App.css'
import ModalBuyer from "./components/ModalBuyer.jsx"


function App() {
  const [vehicles, setVehicles] = useState([])
  const [models, setModels] = useState([])
  const [isVehicleIdToEdit, setIsVehicleIdToEdit] = useState()
  const [VehicleIdToBuy, setVehicleIdToBuy] = useState()
  const [isShowedForm, setIsShowedForm] = useState(false)
  const [isShowedBuyerForm, setIsShowedBuyerForm] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  // Counting vehicles
  let cars = vehicles.filter(vehicle => vehicle.type === 'car')
  let motorcycles = vehicles.filter(vehicle => vehicle.type === 'motorcycle')

  //submit of the form
  const submit = (data) => {
    let modelToCompare = models.find(model => model.modelName == data.model)
    let minPrice = modelToCompare.price * 0.85

    if(data.price < minPrice){
      Swal.fire({
        icon: 'error',
        title: `The price of this used vehicle cannot be less than $${minPrice} `,
        showConfirmButton: false,
        timer: 5500
      })
      return
    }

    if(!data.cylinderCapacity){
      data.cylinderCapacity = null
    }

    if(!data.speeds){
      data.speeds = null
    }

    if(isVehicleIdToEdit){
      editVehicle(data)
    } else {
      createVehicle(data)
    }
  }

  
  const createVehicle = (data) => {
    const URL = BASE_URL + "/vehicles"

    if(data.type === 'car' && cars.length < 10 || data.type === 'motorcycle' && motorcycles.length < 15) {
      axios.post(URL, data)
      .then(() => {
        getAllVehicles()
        setIsShowedForm(false)
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Successful registration',
          showConfirmButton: false,
          timer: 2500
        })
      })
      .catch((err) => console.log(err))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You have exceeded the total capacity of vehicles',
        showConfirmButton: false,
        timer: 4500
      })
    }
  }

  const editVehicle = (data) => {
    const URL = BASE_URL + `/vehicles/${isVehicleIdToEdit}/`

    axios.patch(URL, data)
    .then(() => {
      getAllVehicles()
      Swal.fire({
        icon: 'success',
        title: 'Successful registration',
        showConfirmButton: false,
        timer: 2500
      })
      reset()
      setIsShowedForm(!isShowedForm)
      setIsVehicleIdToEdit()
    })
    .catch((err) => console.log(err))
  }

  const deleteVehicle = (vehicle) => {
    setIsShowedBuyerForm(true)
    setVehicleIdToBuy(vehicle.vehicleId)
  }
  
  const handleClickEdit = (data) => {
    setIsShowedForm((isShowedForm) => !isShowedForm )
    reset(data)
    setIsVehicleIdToEdit(data.vehicleId)
  }
  
  const getAllVehicles = () => {
    const URL = BASE_URL + "/vehicles"

    axios.get(URL)
    .then((res) => setVehicles(res.data.vehicles))
    .catch((err) => console.log(err))
  }

  const getAllModels = () => {
    const URL = BASE_URL + "/models"

    axios.get(URL)
    .then((res) => setModels(res.data.models))
    .catch((err) => console.log(err))
  }
  

  useEffect(() => {
    getAllVehicles()
    getAllModels()
  }, [])


  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header setIsShowedForm={setIsShowedForm} />

      <main className="flex-grow relative">
        <ModalToRegister models={models} isShowedForm={isShowedForm} setIsShowedForm={setIsShowedForm} register={register} handleSubmit={handleSubmit} submit={submit} reset={reset} setIsVehicleIdToEdit={setIsVehicleIdToEdit} isVehicleIdToEdit={isVehicleIdToEdit} errors={errors} />

        <ModalBuyer
          setIsShowedBuyerForm={setIsShowedBuyerForm}
          isShowedBuyerForm={isShowedBuyerForm} VehicleIdToBuy={VehicleIdToBuy} getAllVehicles={getAllVehicles} setVehicleIdToBuy={setVehicleIdToBuy}
        />

        <VehiclesList vehicles={vehicles} models={models} deleteVehicle={deleteVehicle} handleClickEdit={handleClickEdit} />
        
      </main>

      <Footer />
    </div>
  )
}

export default App
