export const getGmtISOString = (date) => {
  const inputDate = new Date(date);
  const gmtDateString = inputDate.toLocaleString('en-US', { timeZone: 'GMT' });

  return new Date(gmtDateString).toISOString();
};

export const getNextDayGmtISOString = (date) => {
  const currentDateISOString = getGmtISOString(date);

  const nextDate = new Date(currentDateISOString);

  nextDate.setDate(nextDate.getDate() + 1);

  return nextDate.toISOString();
};
