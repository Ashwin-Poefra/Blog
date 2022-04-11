// utils
const { DATABASE } = require("../utils");

const createComment = async (commentData) => {
    try {
        console.log(commentData);
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.returning("id").insert(
            "comments",
            commentData
        );
    } catch (error) {
        throw error;
    }
};

const readComments = async (commentData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.select(["blogs.id"])
            .from("comments")
            .join("blogs", "comments.commentBlogId = blogs.id", "right")
            .where({
                "comments.mainBlogId": commentData.mainBlogId,
                "blogs.userId": commentData.userId,
            })
            .get();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createComment,
    readComments,
};
