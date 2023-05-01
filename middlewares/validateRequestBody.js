const { body, validationResult } = require('express-validator');

// Define a validation middleware for the request body
function validateRequestBody(field) {
  return [
    body(field)
      .isURL({ require_protocol: true, protocols: ['http', 'https'] })
      .withMessage('Invalid URL')
      .escape(),
    function (req, res, next) {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Continue to the next middleware
      next();
    },
  ];
}

export { validateRequestBody };
