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

//these custom api methods should make using our backend easier by standardizing the inputs

const apiGet = (authState, url, payload = null) => {
  console.log(
    'payload form apiGet: ',
    payload,
    'url: ',
    `${process.env.REACT_APP_API_URI}${url}`
  );
  const config = {
    headers: getAuthHeader(authState),
  };
  //console.log('apiGet body: ', config);
  return axios.get(
    `${process.env.REACT_APP_API_URI}${url}/${payload.id}`,
    config
  );
};

const apiPost = (authState, url, payload = null) => {
  //console.log('apiPost:'payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    ...payload,
  };
  const config = {
    headers: getAuthHeader(authState),
  };
  return axios.post(`${process.env.REACT_APP_API_URI}${url}`, body, config);
};

const apiPut = (authState, url, payload = null) => {
  console.log('apiPut:', payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    ...payload,
  };
  const config = {
    headers: getAuthHeader(authState),
  };

  return axios.put(`${process.env.REACT_APP_API_URI}${url}`, body, config);
};

const apiDelete = (authState, url, payload = null) => {
  //console.log('apiDelete:',payload, `${process.env.REACT_APP_API_URI}/${url}`);
  const body = {
    headers: getAuthHeader(authState),
    data: { ...payload },
  };
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
  getAuthHeader,
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
};
