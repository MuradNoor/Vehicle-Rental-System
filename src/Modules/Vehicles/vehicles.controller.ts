import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const createVehicle = async(req: Request, res: Response) => {
    try{
        const result = await vehicleService.createVehicle(req.body);
        res.status(200).json({
            success: true,
            message: "Vehicle created successfully",
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

const getAllVehicles = async(req: Request, res: Response) => {
    try{
        const result = await vehicleService.getAllVehicles();
        if(result.rows.length === 0){
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        })
    }catch(err: any){
          res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
    }
};

const getSingleVehicle = async(req: Request, res: Response) => {
    try{
        const result = await vehicleService.getSingleVehicle(req.params.id!);
        if(result.rows.length === 0){
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
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

const updateVehicle = async(req: Request, res: Response) => {
    const {vehicle_name, type, registration_number, daily_rent_price , availability_status} = req.body;
    try{
        const result = await vehicleService.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.id!);
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
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

const deleteVehicle = async(req: Request, res: Response) => {
    try{
        const result = await vehicleService.deleteVehicle(req.params.id!);
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
    }
};

export const vehicleController = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}