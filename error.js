const buildResponse = (status, message, data) => {
  return {
    status: status,
    operation: status === 200 ? "success" : "fail",
    description: message,
    data: data,
  };
};

module.exports = buildResponse;
