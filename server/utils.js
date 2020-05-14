const getErrorResponseObject = (status, message) => {
    return { error: { status: status, message: message } };
};

module.exports = {
    getErrorResponseObject: getErrorResponseObject
};
