import btoa from 'btoa';

export const getAxiosBodyParameters = (header, baseUrl, mainUrl) => {
  return [
    `${baseUrl}/${mainUrl}`,
    {
      headers: {
        Authorization: `Basic ${btoa(header)}`,
        'Content-Type': 'application/json',
      },
    },
  ];
};
