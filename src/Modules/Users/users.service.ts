import { pool } from "../../config/db"

const getUsers = async() => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role  FROM Users`);
        return result;
};

const updateUser = async(name: string, email: string, phone: string, role: string, id: string) => {
    const result = await pool.query(`
        UPDATE Users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role
        `, [name, email, phone, role, id]);
    return result;
};

const deleteUser = async(id: string) => {
    const bookingRes = await pool.query(`SELECT id FROM Bookings`);
    const bookingId = bookingRes.rows[0].id;
    const bookingStatus = await pool.query(`SELECT status, customer_id FROM Bookings WHERE id=$1`, [bookingId]);
    const status = bookingStatus.rows[0].status;
     const customerId = bookingStatus.rows[0].customer_id;
    if(customerId == id && status === 'active'){
        throw new Error("User has a active booking");
    }
    const result = await pool.query(`DELETE FROM Users WHERE id=$1`, [id]);
    return result;
};

export const userService = {
    getUsers,
    updateUser,
    deleteUser
};