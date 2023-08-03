import React from 'react'

const Header = ({ isShowedForm, setIsShowedForm }) => {
    const handleClickShowModal = () => {
        setIsShowedForm((isShowedForm) => !isShowedForm)
    }
    

    return (
        <header className='bg-secondary-color w-full m-0 p-4 text-center flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between'>
            <h1 className='text-3xl text-white md:ml-32'>Sincosoft</h1>

            <button onClick={handleClickShowModal} className='bg-primary-color max-w-max rounded-md flex justify-center items-center text-white px-6 py-2 text-lg md:mr-32 hover:bg-primary-color/90 transition-colors'>
                <i className='bx bx-plus text-2xl'></i> 
                Register vehicle
            </button>
        
        </header>
    )
}

export default Header
