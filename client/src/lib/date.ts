export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', { month: 'long' });
  const day = newDate.toLocaleString('default', { day: 'numeric' });
  const year = newDate.toLocaleString('default', { year: 'numeric' });
  return `${month} ${day}, ${year}`;
};

export const formatDateToUTC = (date: string) => {
  const newDate = new Date(date);
  return newDate.toISOString();
};

export const formatDateFromUTC = (date: string) => {
  const inputDateTime = new Date(date);

  const year = inputDateTime.getFullYear();
  const month = String(inputDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(inputDateTime.getDate()).padStart(2, '0');
  const hours = String(inputDateTime.getHours()).padStart(2, '0');
  const minutes = String(inputDateTime.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
};
