
export  const validateRegisterInput = (req, res, next) => {
  const { firstName, phoneNumber, password } = req.body;
  const errors = [];

  if (!firstName || firstName.trim() === '') {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!phoneNumber === '') {
    errors.push({ field: 'phoneNumber', message: 'Phone number is invalid' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export const validateLoginInput = (req, res, next) => {
  const { phoneNumber, password } = req.body;
  const errors = [];

  if (!phoneNumber) {
    errors.push({ field: 'phoneNumber', message: 'phoneNumber is required' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};
