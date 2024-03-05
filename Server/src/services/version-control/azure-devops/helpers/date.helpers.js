export const getNextDateWithGMT = (date) => {
  const currentDate = getGmtISOString(date);

  return getNextDate(currentDate);
};

export const getGmtISOString = (date) => {
  const inputDate = new Date(date);
  const gmtDateString = inputDate.toLocaleString('en-US', { timeZone: 'GMT' });

  return new Date(gmtDateString).toISOString();
};

const getNextDate = (endDate) => {
  const nextDate = new Date(endDate);
  nextDate.setDate(nextDate.getDate() + 1);

  return nextDate.toISOString();
};
