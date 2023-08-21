const mockData = require("./data.json");

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify(mockData),
    };
};
