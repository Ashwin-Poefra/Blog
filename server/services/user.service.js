// utils
const { DATABASE } = require("../utils");

const createUser = async (userData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector.returning("id").insert("users", userData);
    } catch (error) {
        throw error;
    }
};

const readUsers = async (userData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["id", "username", "email", "photoUrl"])
            .where(userData)
            .get("users");
    } catch (error) {
        throw error;
    }
};

const readUsersPassword = async (userData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["id", "password"])
            .where(userData)
            .get("users");
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, userData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .where({ id })
            .set({
                ...userData,
                updatedAt: moment(new Date()).format("YYYY/MM/DD HH:MM:SS"),
            })
            .update("users");
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .where({ id })
            .set({
                deletedAt: moment(new Date()).format("YYYY/MM/DD HH:MM:SS"),
            })
            .update("users");
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    readUsers,
    readUsersPassword,
    updateUser,
    deleteUser,
};
