import { pool } from "../../config/db"

const createBooking = async(customer_id : string, vehicle_id : string, rent_start_date : string, rent_end_date: string) => {
    const start: Date = new Date(rent_start_date);
    const end: Date = new Date(rent_end_date);
    const diffInMs = end.getTime() - start.getTime();
    const duration: number = diffInMs / (1000*60*60*24)+1;
    const vehicleRes = await pool.query(`
        SELECT daily_rent_price, availability_status FROM Vehicles WHERE id=$1
        `, [vehicle_id]);
    const total_price = duration * vehicleRes.rows[0].daily_rent_price 
    const result = await pool.query(`
        INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
            VALUES ($1, $2, $3, $4, $5, 'active')
            RETURNING *;
        `,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);
    const updateStatus = await pool.query(`
        UPDATE Vehicles SET availability_status = 'booked' WHERE id = $1
        `, [vehicle_id]);
    return result;
};

const getBookings = async() => {
    const result = await pool.query(`SELECT * FROM Bookings`);
    const userData = await pool.query(`SELECT name, email FROM Users`);
    const vehicleData = await pool.query(`SELECT vehicle_name, registration_number FROM Vehicles`);
    const customer = userData.rows[0];
    const vehicle = vehicleData.rows[0];
    return {result, customer, vehicle};
};

export const bookingService = {
    createBooking,
    getBookings
};