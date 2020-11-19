import axios from 'axios';

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const apiGet = (authState, url, payload = null) => {
  console.log(payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    headers: getAuthHeader(authState),
  };
  return axios.get(
    `${process.env.REACT_APP_API_URI}${url}/${payload.id}`,
    body
  );
};

const apiPost = (authState, url, payload = null) => {
  console.log(payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    headers: getAuthHeader(authState),
    ...payload,
  };
  console.log(body);
  return axios.post(`${process.env.REACT_APP_API_URI}${url}`, body);
};

const apiPut = (authState, url, payload = null) => {
  console.log(payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    headers: getAuthHeader(authState),
    ...payload,
  };
  console.log(body);
  return axios.put(`${process.env.REACT_APP_API_URI}${url}`, body);
};

const apiDelete = (authState, url, payload = null) => {
  console.log(payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    headers: getAuthHeader(authState),
    ...payload,
  };
  console.log(body);
  return axios.delete(`${process.env.REACT_APP_API_URI}${url}`, body);
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
};
