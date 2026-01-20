import express from 'express'
import { protect } from '../middleware/auth.js'
import { checkAvailabilityCar, createBooking, getOwnerBookings, getUserBookings, updateBookingStatus } from '../controllers/bookingController.js'


const bookingRouter = express.Router()

bookingRouter.post('/check-availability', checkAvailabilityCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.post('/change-status', protect, updateBookingStatus)

export default bookingRouter