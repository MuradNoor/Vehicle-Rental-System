import { Request, Response } from "express";
import { bookingService } from "./bookings.service";
import { Roles } from "../Auth/auth.constant";

const createBooking = async(req: Request, res: Response) => {
    const {customer_id,vehicle_id,rent_start_date,rent_end_date} = req.body;
    try{
        const result = await bookingService.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date);
        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0]
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
    }
};

const getBookings = async(req: Request, res: Response) => {
    try{
        const result = await bookingService.getBookings();
        const booking = result.result.rows[0];
        const customer = result.customer;
        const vehicle = result.vehicle;
        if(req.user!.role === Roles.admin){
            res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: [{...booking,customer,vehicle}]
        });
        }
        if(req.user!.role === Roles.user){
            res.status(200).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data: [{...booking, vehicle}]
            });
        }
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
    }
}

export const bookingController = {
    createBooking,
    getBookings
};