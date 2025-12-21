import { Request, Response } from "express";
import { userService } from "./users.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
  }
};

const updateUser = async(req: Request, res: Response) =>{
    const {name, email, phone, role} = req.body;
    try{
        const result = await userService.updateUser(name, email, phone, role, req.params.id!);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
    }
};

const deleteUser = async(req: Request, res: Response) => {
    try{
        const result = await userService.deleteUser(req.params.id!);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }catch(err: any){
        res.status(500).json({
      success: false,
      message: "Failed",
      errors: err.message,
    });
    }
};

export const userController = {
  getUsers,
  updateUser,
  deleteUser
};
