import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Car = () => {

  // Getting search params from url
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation') || '';
  const pickupDate = searchParams.get('pickupDate') || ''
  const returnDate = searchParams.get('returnDate') || ''

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate

  const [filteredCars, setFilteredCars] = useState([])

  // const SearchCarAvailablity = async () => {
  //   const { data } = await axios.post('/api/bookings/check-availability', {
  //     location: pickupLocation,
  //     pickupDate,
  //     returnDate
  //   })
  //   console.log("API RESPONSE:", data)
  //   if (data.success) {
  //     const cars = data.availableCars || []
  //     setFilteredCars(cars)
  //     console.log("filteredCars:", filteredCars)
  //     if (data.availableCars.length === 0) {
  //       toast.error('No cars available for the selected dates and location')
  //     }
  //     return null
  //   }
  // }

  const applyFilter = async () => {
    if (input === '') {
      setFilteredCars(cars)
      return null
    }
    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLowerCase())
        ||
        car.model.toLowerCase().includes(input.toLowerCase())
        || car.category.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }


  const SearchCarAvailablity = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate
      })

      console.log("API RESPONSE:", data)

      if (!data.success) {
        setFilteredCars([])
        toast.error(data.message || 'Failed to fetch cars')
        return
      }

      const cars = data.availableCars || data.cars || []

      setFilteredCars(cars)

      if (cars.length === 0) {
        toast.error('No cars available for selected dates')
      }

    } catch (error) {
      console.error(error)
      toast.error('Server error')
      setFilteredCars([])
    }
  }


  useEffect(() => {
    isSearchData && SearchCarAvailablity()
  }, [pickupLocation, pickupDate, returnDate])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [cars, input])
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selction of premium vehicles available for your next adventure' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h4.5 mr-2' />
          <input
            type="text"
            placeholder='Search by make, model, or features'
            className='w-full h-full outline-none text-gray-500'
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <img src={assets.filter_icon} alt="" className='w-4.5 h4.5 mr-2' />
        </motion.div>
      </motion.div>

      <motion.div
      initial = {{opacity: 0}}
      animate ={{opacity: 1}}
      transition={{duration: 0.5, delay: 0.6}}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars?.length || 0} Cars
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => {
            return <motion.div
            initial = {{opacity: 0, y: 20}}
      animate ={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.1 * index}}
            key={index}>
              <CarCard car={car} />
            </motion.div>
          })}
        </div>

      </motion.div>
    </div>
  )
}

export default Car
