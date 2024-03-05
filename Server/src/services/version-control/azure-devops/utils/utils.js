export const getNextDateWithGMT = (date) => {
  const currentDate = getGMTDate(date);

  return getNextDate(currentDate);
};

export const getGMTDate = (date) => {
  const istDate = new Date(date);
  const gmtDate = istDate.toLocaleString('en-US', { timeZone: 'GMT' });
  const currentDate = new Date(gmtDate);

  return currentDate.toISOString();
};

const getNextDate = (endDate) => {
  const nextDate = new Date(endDate);
  nextDate.setDate(nextDate.getDate() + 1);

  return nextDate.toISOString();
};
