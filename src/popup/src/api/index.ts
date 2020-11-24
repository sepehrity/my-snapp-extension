import type { RideHistoryResponse } from 'types/RideHistoryResponse';

export const getRidePage = async (
  accessToken: string,
  page: number
): Promise<RideHistoryResponse[]> => {
  const url = `https://app.snapp.taxi/api/api-base/v2/passenger/ride/history?page=${page}`;
  return await fetch(url, {
    headers: {
      'User-Agent': navigator.userAgent,
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'app-version': 'pwa',
      'x-app-version': '5.0.1',
      'x-app-name': 'passenger-pwa',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    referrer: 'https://app.snapp.taxi/ride-history',
    method: 'GET',
    mode: 'cors',
  })
    .then((c) => c.json())
    .then((c) => c.data.rides);
};
