const logger = require("./logger")

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === "ValidationError") {
    return res.status(400).json({ errorName: error.name, errorMessage: error.message })
  }

  next(error)
}

module.exports = { errorHandler }