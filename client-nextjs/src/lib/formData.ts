export const createFormData = (data: any) => {
  const formData = new FormData();

  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (let i = 0; i < data[key].length; i++) {
        formData.append(`${key}[]`, data[key][i]);
      }
      continue;
    }
    formData.append(key, data[key]);
  }
  return formData;
};
