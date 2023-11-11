export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', { month: 'long' });
  const day = newDate.toLocaleString('default', { day: 'numeric' });
  const year = newDate.toLocaleString('default', { year: 'numeric' });
  return `${month} ${day}, ${year}`;
};
