const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SPOTIFY_API_ENDPOINT = "https://api.spotify.com/v1";
const SPOTIFY_SEARCH_ENDPOINT = `${SPOTIFY_API_ENDPOINT}/search`;
const SPOTIFY_SEARCH_MARKET = "US"

async function getAccessToken(refresh_token: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export async function searchSpotifyByName(name: string, refresh_token: string) {
  const { access_token } = await getAccessToken(refresh_token);
  const requestURL = encodeURI(`${SPOTIFY_SEARCH_ENDPOINT}?q=${name}&type=artist&market=${SPOTIFY_SEARCH_MARKET}&limit=30&offset=0`);
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    },
  };

  return fetch(requestURL, requestOptions);
};
