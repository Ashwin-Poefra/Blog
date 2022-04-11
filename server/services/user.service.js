// utils
const { DATABASE } = require("../utils");

const createUser = async (userData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.returning("id").insert("users", userData);
    } catch (error) {
        throw error;
    }
};

const readUsers = async (userData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.select([
            "id",
            "username",
            "email",
            "photoUrl",
        ])
            .where(userData)
            .get("users");
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, userData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.where({ id }).from("users").set({ userData });
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.where({ id })
            .from("users")
            .set({ deletedAt: new Date() });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    readUsers,
    updateUser,
    deleteUser,
};
