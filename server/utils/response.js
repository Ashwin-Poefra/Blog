const Response = (res, status, data) => {
    if (status === 200) {
        res.status(200).json({
            ...data,
        });
    } else {
        res.status(status).json({
            message: data,
        });
    }
};

module.exports = Response;
