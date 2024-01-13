//takes:2024-01-13T17:31:06.326+00:00
//returns: January 13, 2024
export const formatDate = (date: string, time: boolean = false) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', { month: 'long' });
  const day = newDate.toLocaleString('default', { day: 'numeric' });
  const year = newDate.toLocaleString('default', { year: 'numeric' });
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedTime = `${hours}:${minutes}`;
  if (time) {
    return `${month} ${day}, ${year} at ${formattedTime}`;
  }
  return `${month} ${day}, ${year}`;
};

//takes: 2024-01-21T19:40
//returns: 2024-01-21T17:40:00.000Z
export const formatDateToUTC = (date: string) => {
  const newDate = new Date(date);
  return newDate.toISOString();
};

//takes:2024-01-13T17:31:06.326+00:00
//returns: 2024-01-26T15:07
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

export const formatDateAndTime = (dateString: string, timeString: string): string => {
  const inputDate = new Date(dateString);
  const [hours, minutes] = timeString.split(':').map(Number);

  inputDate.setUTCHours(hours);
  inputDate.setUTCMinutes(minutes);

  const formattedDate = inputDate.toISOString();

  return formattedDate;
};
