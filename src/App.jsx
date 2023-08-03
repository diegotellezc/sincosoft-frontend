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


function App() {
  const [vehicles, setVehicles] = useState([])
  const [models, setModels] = useState([])
  const [isVehicleIdToEdit, setIsVehicleIdToEdit] = useState()
  const [isShowedForm, setIsShowedForm] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const submit = (data) => {
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

    Swal.fire({
      icon: 'success',
      title: 'Successful registration',
      showConfirmButton: false,
      timer: 2500
    })
  }
  
  const createVehicle = (data) => {
    const URL = BASE_URL + "/vehicles"
    console.log(data)
    
    axios.post(URL, data)
    .then(() => {
      getAllVehicles()
      setIsShowedForm(false)
    })
    .catch((err) => console.log(err))
  }

  const deleteVehicle = (id) => {
    const URL = BASE_URL + `/vehicles/${id}/`
    axios.delete(URL)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Vehicle sold successfully',
        showConfirmButton: false,
        timer: 1500
      })
      getAllVehicles()
    })
    .catch((err) => console.log(err))
  }

  const editVehicle = (data) => {
    const URL = BASE_URL + `/vehicles/${isVehicleIdToEdit}/`

    axios.patch(URL, data)
    .then(() => {
      getAllVehicles()
      reset()
      setIsShowedForm(!isShowedForm)
      setIsVehicleIdToEdit()
    })
    .catch((err) => console.log(err))
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

        <VehiclesList vehicles={vehicles} models={models} deleteVehicle={deleteVehicle} handleClickEdit={handleClickEdit} />
        
      </main>

      <Footer />
    </div>
  )
}

export default App
