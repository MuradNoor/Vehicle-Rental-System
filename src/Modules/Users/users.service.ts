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
    const result = await pool.query(`DELETE FROM Users WHERE id=$1`, [id]);
    return result;
};

export const userService = {
    getUsers,
    updateUser,
    deleteUser
};