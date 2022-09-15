import { IMedicine } from "../../@types"

const isValid = (data: IMedicine) => {
  let valid = true;
  const error = {
    MedicineName: '',
    DisplayName: '',
    Price: '',
    Category: '',
  };
  if (!data.MedicineName) {
    error.MedicineName = 'Medicine Name is required';
    valid = false;
  }

  if (data.DisplayName.length < 4 || data.DisplayName.length > 20) {
    error.DisplayName = 'Display Name should be between 4 and 20 length'
    valid = false;
  }

  if (isNaN(data.Price)) {
    error.Price = 'Price must be number'
    valid = false;
  }

  if (!data.Category) {
    error.Category = 'Medicine Name is required';
    valid = false;
  }

  return {
    error,
    valid
  }
}

export default isValid;