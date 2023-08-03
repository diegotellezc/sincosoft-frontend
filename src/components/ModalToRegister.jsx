import React from 'react'

const ModalToRegister = ({ isShowedForm, setIsShowedForm, register, handleSubmit, submit, reset, setIsVehicleIdToEdit, isVehicleIdToEdit, errors }) => {
    const handleClickCloseModal = () => {
        setIsShowedForm((isShowedForm) => !isShowedForm)
        reset({
            model: "",
            type: "",
            color: "",
            mileage: "",
            condition: "",
            image: "",
            cylinderCapacity: "",
            speeds: "",
            price: ""
        })
        setIsVehicleIdToEdit()
    }
    


    return (
        <section className={`fixed top-0 left-0 bottom-0 right-0 bg-red flex bg-black/40 justify-center items-center transition-opacity z-20 ${isShowedForm ? "opacity-100 visible" : "opacity-0 invisible"}`}>

            <form onSubmit={handleSubmit(submit)} className='bg-white p-4 grid gap-4 rounded-md w-[300px] h-[90%] relative overflow-y-auto sm:w-[450px] sm:py-6 sm:px-8'>

                <h3 className='text-2xl font-bold text-secondary-color'>{isVehicleIdToEdit ? "Update vehicle" : "New vehicle"}</h3>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="model">Model <span className='text-red-500'>*</span></label>
                    <input placeholder='Example: Mazda 3' className='border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color placeholder:text-xs' id='model' type="text" {...register("model", { 
                        required: "This field is required", maxLength: {
                            value: 25,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        } })} />
                    <span className='text-primary-color text-xs'>
                        {errors.model && errors.model.message}
                    </span>
                </div>
                
                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="type">Type<span className='text-red-500'>*</span></label>
                    <input placeholder='car or motorcycle' className='border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color placeholder:text-xs' id='type' type="text" {...register("type", { 
                        required: "This field is required", maxLength: {
                            value: 10,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        }})} />
                    <span className='text-primary-color text-xs'>
                        {errors.type && errors.type.message}
                    </span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="color">Color <span className='text-red-500'>*</span></label>
                    <input placeholder='Example: red' className='border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color placeholder:text-xs' id='color' type="text" {...register("color", { 
                        required: "This field is required", maxLength: {
                            value: 20,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        } })} />
                        <span className='text-primary-color text-xs'>
                            {errors.color && errors.color.message}
                        </span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="mileage">Mileage <span className='text-red-500'>*</span></label>
                    <input placeholder='Example: 4000' className='border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color placeholder:text-xs focus:border-primary-color' id='mileage' type="number" {...register("mileage", { 
                        required: "This field is required", maxLength: {
                            value: 10,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        } })} />
                    <span className='text-primary-color text-xs'>
                        {errors.mileage && errors.mileage.message}
                    </span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="condition">Condition<span className='text-red-500'>*</span></label>
                    <input placeholder='new or used' className='border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color placeholder:text-xs' id='condition' type="text" {...register("condition", { 
                        required: "This field is required", maxLength: {
                            value: 10,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        }})} />
                    <span className='text-primary-color text-xs'>
                        {errors.condition && errors.condition.message}
                    </span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="image">Image<span className='text-red-500'>*</span></label>
                    <input className='border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color placeholder:text-xs' id='image' type="text" placeholder='Image formats: jpg, jpeg, gif or png' {...register("image", {
                        required: "This field is required", pattern: {
                            value: /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/,
                            message: "The URL format for images is invalid"
                        }
                    })} />
                    <span className='text-primary-color text-xs'>{errors.image && errors.image.message}</span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="price">Price</label>
                    <input placeholder='only for used vehicles' className='placeholder:text-xs border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color' id='price' type="number" {...register("price", { 
                        maxLength: {
                            value: 10,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        } })} />
                    <span className='text-primary-color text-xs'>
                        {errors.price && errors.price.message}
                    </span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="cylinderCapacity">Cylinder Capacity</label>
                    <input placeholder='only for motorcycles' className='placeholder:text-xs border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color' id='cylinderCapacity' type="number" {...register("cylinderCapacity", { 
                        maxLength: {
                            value: 3,
                            message: "You have exceeded the maximum characters allowed"
                        }, minLength: {
                            value: 2,
                            message: "You must enter more than one character"
                        } })} />
                    <span className='text-primary-color text-xs'>
                        {errors.cylinderCapacity && errors.cylinderCapacity.message}
                    </span>
                </div>

                <div className='grid gap-1'>
                    <label className='text-xs font-semibold' htmlFor="speeds">Speeds</label>
                    <input placeholder='only for motorcycles' className='placeholder:text-xs border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color' id='speeds' type="number" {...register("speeds", { 
                        maxLength: {
                            value: 1,
                            message: "You have exceeded the maximum characters allowed"
                        } })} />
                    <span className='text-primary-color text-xs'>
                        {errors.speeds && errors.speeds.message}
                    </span>
                </div>



                <i onClick={handleClickCloseModal} className='bx bx-x absolute right-2 top-1 text-2xl hover:text-primary-color cursor-pointer'></i>

                <button className='bg-primary-color text-white p-2 text-sm border-2 border-transparent hover:text-[0.9rem] hover:border-secondary-color transition-colors rounded-md sm:max-w-max sm:mx-auto sm:px-8'>{isVehicleIdToEdit ? "Save changes" : "Register vehicle"}</button>
            </form>
        
        </section>
    )
}

export default ModalToRegister
