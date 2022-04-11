// utils
const { DATABASE } = require("../utils");

const createBlog = async (blogData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.returning("id").insert("blogs", blogData);
    } catch (error) {
        throw error;
    }
};

const readMainBlogs = async (blogData) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.select([
            "blogs.id",
            "users.username",
            "blogs.title",
            "blogs.text",
            "blogs.imageUrl",
            "COUNT(likes.blogId) AS `like`",
        ])
            .from("blogs")
            .join("users", "blogs.userId = users.id")
            .join("likes", "blogs.id = likes.blogId", "left")
            .join("comments", "blogs.id = comments.commentBlogId", "left")
            .group_by("blogs.id")
            .where("comments.createdAt is NULL")
            .get();
    } catch (error) {
        throw error;
    }
};

const readCertainBlogs = async (id) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.select([
            "blogs.id",
            "users.username",
            "blogs.title",
            "blogs.text",
            "blogs.imageUrl",
            "comments.mainBlogId",
            "COUNT(likes.blogId) AS `like`",
        ])
            .from("blogs")
            .join("users", "blogs.userId = users.id")
            .join("likes", "blogs.id = likes.blogId", "left")
            .join(
                "comments",
                "blogs.id = comments.commentBlogId OR blogs.id = comments.mainBlogId",
                "left"
            )
            .group_by("blogs.id")
            .where(`comments.mainBlogId = ${id} OR blogs.id = ${id}`)
            .order_by("blogs.createdAt")
            .get();
    } catch (error) {
        throw error;
    }
};

const readBlogs = async (id) => {
    try {
        const QueryBuilder = await DATABASE.get_connection();
        return await QueryBuilder.select("*")
            .from("blogs")
            .where({ "blogs.id": id })
            .get();
    } catch (error) {
        throw error;
    }
};

const updateBlog = async (id, blogData) => {
    // try {
    //     const QueryBuilder = await DATABASE.get_connection();
    //     return await QueryBuilder.where({ id }).from("Blogs").set({ blogData });
    // } catch (error) {
    //     throw error;
    // }
};

const deleteBlog = async (id) => {
    // try {
    //     const QueryBuilder = await DATABASE.get_connection();
    //     return await QueryBuilder.where({ id })
    //         .from("Blogs")
    //         .set({ deletedAt: new Date() });
    // } catch (error) {
    //     throw error;
    // }
};

module.exports = {
    createBlog,
    readMainBlogs,
    readCertainBlogs,
    readBlogs,
    updateBlog,
    deleteBlog,
};
