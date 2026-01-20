import Booking from "../models/Booking.js"
import Car from "../models/Car.js"
// Function to check Availabilty of car for a given date

const checkAvailability = async (carId, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car: carId,
        pickupDate: { $lte: new Date(returnDate) },
        returnDate: { $gte: new Date(pickupDate) },
        status: { $ne: 'cancelled' }
    })

    return bookings.length === 0
}


// API to check availability of cars for the given date and location

export const checkAvailabilityCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;
        // fetch all available cars for the given location

        const cars = await Car.find({ location, isAvailable: true })

        // chechk each car availability for the given date
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return { ...car._doc, isAvailable: isAvailable }
        })
        let availableCars = await Promise.all(availableCarsPromises)
        availableCars = availableCars.filter((car) => car.isAvailable === true)
        res.json({ success: true, availableCars: availableCars })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to book a car

// export const createBooking = async (req, res) => { 
//     try {
//         const {_id} = req.user
//         const {car, pickupDate, returnDate} = req.body

//         const isAvailable = await checkAvailability(car, pickupDate, returnDate)
//         if(!isAvailable){
//             return res.json({success: false, message: "Car is not available for the selected dates"}) 
//         }
//         const carData = await Car.findById(car)
//         // Calculate price based on pickupDate and returnDate
//         const picked = new Date(pickupDate)
//         const returned = new Date(returnDate)
//         const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
//         const price = carData.pricePerDay * noOfDays
//      await Booking.create({ car, owner: carData.owner, user: _id, pickupDate, returnDate, price, status: 'pending' })

//         res.json({success: true, message: "Booking Created"})
//     } catch (error) {
//         console.log(error.message)
//         res.json({ success: false, message: error.message })
//     }
// }
// export const createBooking = async (req, res) => {
//     try {
//         const { _id } = req.user
//         const { car, pickupDate, returnDate } = req.body

//         const picked = new Date(pickupDate)
//         const returned = new Date(returnDate)

//         if (returned <= picked) {
//             return res.json({
//                 success: false,
//                 message: "Return date must be after pickup date"
//             })
//         }

//         const isAvailable = await checkAvailability(car, pickupDate, returnDate)
//         if (!isAvailable) {
//             return res.json({
//                 success: false,
//                 message: "Car is not available for the selected dates"
//             })
//         }

//         const carData = await Car.findById(car)
//         const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
//         const price = carData.pricePerDay * noOfDays

//         await Booking.create({
//             car,
//             owner: carData.owner,
//             user: _id,
//             pickupDate: picked,   
//             returnDate: returned, 
//             price,
//             status: 'pending'
//         })

//         res.json({ success: true, message: "Booking Created" })

//     } catch (error) {
//         console.log(error.message)
//         res.json({ success: false, message: error.message })
//     }
// }
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user
         const userId = req.user.id
        const { car, pickupDate, returnDate } = req.body

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)

        if (returned <= picked) {
            return res.json({
                success: false,
                message: "Return date must be after pickup date"
            })
        }

        // 2) Prevent booking own car
        if (car.owner.toString() === userId) {
            return res.json({success: false, message: 'Owners cannot book their own car' });
        }

        //  HARD BLOCK overlapping bookings
        const conflict = await Booking.findOne({
            car,
            pickupDate: { $lte: returned },
            returnDate: { $gte: picked },
            status: { $ne: "cancelled" } //  
        })

        if (conflict) {
            return res.json({
                success: false,
                message: "Car already booked for selected dates"
            })
        }

        const carData = await Car.findById(car)
        const days =
            Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))

        const price = days * carData.pricePerDay

        await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate: picked,
            returnDate: returned,
            price
        })


        res.json({ success: true, message: "Booking confirmed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}




// API to list user Booking

export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user
        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to list owner Booking
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const bookings = await Booking.find({ owner: req.user._id }).populate("car user").select("-user.password").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user
        const { bookingId, status } = req.body
        const booking = await Booking.findById(bookingId)
        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        booking.status = status
        await booking.save()
        res.json({ success: true, message: "Booking status updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}