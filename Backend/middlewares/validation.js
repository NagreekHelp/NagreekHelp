export const validateRegisterInput = (req, res, next) => {
  const { firstName, phoneNumber, password, pincode, city } = req.body;
  const errors = [];

  if (!firstName || firstName.trim() === '') {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
    errors.push({ field: 'phoneNumber', message: 'Phone number must be 10 digits' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }

  if (!pincode || !/^[1-9][0-9]{5}$/.test(pincode)) {
    errors.push({ field: 'pincode', message: 'Pincode must be a valid 6-digit number' });
  }

  if (!city || !/^[A-Za-z\s'-]+$/.test(city)) {
    errors.push({ field: 'city', message: 'City name is invalid' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
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
