const usersController = {
  getAll: (req, res) => {
    res.end("Returning all users");
  },

  getUserById: (req, res) => {
    res.end(`Returning user with id ${req.params.userId}`);
  },
};

module.exports = usersController;
