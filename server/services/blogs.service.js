// utils
const { DATABASE } = require("../utils");

const createBlog = async (blogData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector.returning("id").insert("blogs", blogData);
    } catch (error) {
        throw error;
    }
};

const readMainBlogsCount = async (title) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select(["COUNT (*) as count"])
            .from("blogs")
            .join("comments", "blogs.id = comments.commentBlogId", "left")
            .where("comments.createdAt is NULL")
            .like("blogs.title", `%${title}%`, "none")
            .get();
    } catch (error) {
        throw error;
    }
};

const readMainBlogs = async (pageIndex, itemCount, title) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select([
                "blogs.id",
                "blogs.userId AS `userId`",
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
            .like("blogs.title", `%${title}%`, "none")
            .offset((pageIndex - 1) * itemCount)
            .limit(itemCount)
            .get();
    } catch (error) {
        throw error;
    }
};

const readCertainBlogs = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        console.log(
            dbConnector
                .select([
                    "blogs.id",
                    "blogs.userId AS `userId`",
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
                .where(`comments.mainBlogId = ${id} OR blogs.id = ${id}`)
                .order_by("blogs.createdAt")
                .get_compiled_select()
        );

        return await dbConnector
            .select(["A.*", "COUNT(A.blogId) as `like`"])
            .from(
                dbConnector
                    .select([
                        "blogs.id",
                        "blogs.userId AS `userId`",
                        "users.username",
                        "blogs.title",
                        "blogs.text",
                        "blogs.imageUrl",
                        "comments.mainBlogId",
                        "likes.blogId AS blogId",
                    ])
                    .from("blogs")
                    .join("users", "blogs.userId = users.id")
                    .join("likes", "blogs.id = likes.blogId", "left")
                    .join(
                        "comments",
                        "blogs.id = comments.commentBlogId OR blogs.id = comments.mainBlogId",
                        "left"
                    )
                    .where(`comments.mainBlogId = ${id} OR blogs.id = ${id}`)
                    .order_by("blogs.createdAt")
                    .get_compiled_select() + "AS A"
            )
            .group_by("A.id")
            .get();
        // return await dbConnector
        //     .select([
        //         "blogs.id",
        //         "blogs.userId AS `userId`",
        //         "users.username",
        //         "blogs.title",
        //         "blogs.text",
        //         "blogs.imageUrl",
        //         "comments.mainBlogId",
        //         "COUNT(likes.blogId) AS `like`",
        //     ])
        //     .from("blogs")
        //     .join("users", "blogs.userId = users.id")
        //     .join("likes", "blogs.id = likes.blogId", "left")
        //     .join(
        //         "comments",
        //         "blogs.id = comments.commentBlogId OR blogs.id = comments.mainBlogId",
        //         "left"
        //     )
        //     .group_by("blogs.id")
        //     .where(`comments.mainBlogId = ${id} OR blogs.id = ${id}`)
        //     .order_by("blogs.createdAt")
        //     .get();
    } catch (error) {
        throw error;
    }
};

const readCertainBlog = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select([
                "blogs.id",
                "blogs.userId AS `userId`",
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
            .where(`blogs.id = ${id}`)
            .order_by("blogs.createdAt")
            .get();
    } catch (error) {
        throw error;
    }
};

const readBlogs = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .select("*")
            .from("blogs")
            .where({ "blogs.id": id })
            .get();
    } catch (error) {
        throw error;
    }
};

const updateBlog = async (id, blogData) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .where({ id })
            .set({
                ...blogData,
                updatedAt: new Date(),
            })
            .update("blogs");
    } catch (error) {
        throw error;
    }
};

const deleteBlog = async (id) => {
    try {
        const dbConnector = await DATABASE.getConnection();
        return await dbConnector
            .where({ id })
            .from("Blogs")
            .set({ deletedAt: new Date() });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createBlog,
    readMainBlogs,
    readMainBlogsCount,
    readCertainBlogs,
    readCertainBlog,
    readBlogs,
    updateBlog,
    deleteBlog,
};
