const validate = {
  route(req, res) {
    res.status(404).send({
      status: 404,
      error: 'This url does not exist',
    });
  },
};

export default validate;
