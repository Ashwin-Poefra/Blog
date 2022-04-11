// utils
const { DATABASE } = require("../utils");

const createLike = async (likeData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.returning("id").insert("likes", likeData);
    } catch (error) {
        throw error;
    }
};

const readLikes = async (likeData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.select(["id"])
            .from("likes")
            .where(likeData)
            .get();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createLike,
    readLikes,
};
