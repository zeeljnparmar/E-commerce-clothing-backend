exports.successfullyCreatedResponse = (
  res,
  data,
  msg = "Successfully Created."
) => {
  return res.status(201).json({ data, msg });
};
