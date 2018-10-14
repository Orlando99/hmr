import axios from 'axios';
import { loadLocalStorage } from '../lib/localStorage';
const constructBaseUrl = () => {
  return process.env.REACT_APP_BASE_URL || 'https://hmr-dev-api.now.sh/api/';
  // const env = process.env && process.env.NODE_ENV;
  // if(env === 'local') {
  //   return 'http://localhost:3000/api';
  // } else if (env === 'development') {
  //   return 'https://hmr-dev-api.now.sh/api/';
  // } else if (env === 'production') {
  //   return 'https://hmr-prod-api.now.sh/api/';
  // } else {
  //   return 'https://hmr-dev-api.now.sh/api/';
  // }
};

const baseUrl = constructBaseUrl();

const instantiateAxios = (baseURL) => {
  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };
  return axios.create({
    baseURL,
    headers,
    timeout: 30000,
    crossDomain: true,
    withCredentials: false,
  });
};
const pageSize = 9;


const create = (store) => {

  const axiosInstance = instantiateAxios(baseUrl);
  // Also, this?
  // Should we be sending JWT tokens up in the headers?
  // const updateToken = (token) => {
  //   endpoints.filter(x => x.indexOf('google') === -1).forEach(
  //     endpoint => apis[endpoint].setHeader('Authorization', `Bearer ${token}`)
  //   );
  //   axiosGlobalInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  // };

  const addressLookup = ({ addressStreet, city, state, zip }) => {
    return axiosInstance.get('addresses/address-lookup-google', {
      params: {
        addressStreet,
        city,
        state,
        zip
      }
    });
  };

  const allRoars = ({offset, searchTerm}) => {
    console.log('offset in service call', offset);
    console.log('search term in service call', searchTerm);
    return axiosInstance.get('roars/public-roars', {
      params: {
        // Hardcoding limit of pagination
        limit: pageSize,
        offset: offset * pageSize,
        searchTerm
      }
    });
  };

  const getRoar = (id) => {
    return axiosInstance.get(`roars/roar?id=${id}`);
  };

  const myRoars = ({offset, searchTerm}) => {
    const token = loadLocalStorage('hmrToken');
    // console.log('token is', token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axiosInstance.get('roars/my-roars', {
      params: {
        limit: 9,
        offset
      }
    });
  };

  const createCard = ({ card }) => {
    return axiosInstance.post('roars/create-roar', card);
  };

  const uploadFile = ({photo, pixelCrop}) => {
    // console.log('pixel crop in api', pixelCrop)
    const data = new FormData();
    data.append('file', photo);
    if(pixelCrop) {
      data.append('pixelCropX', pixelCrop.x);
      data.append('pixelCropY', pixelCrop.y);
      data.append('pixelCropWidth', pixelCrop.width);
      data.append('pixelCropHeight', pixelCrop.height);
    }
    return axiosInstance.post('uploads/s3', data, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        accept: '*/*'
      },
      timeout: 30000,
    });
  };

  /**
   *
   * @param {object} user object with email | password
   */
  const loginUser = (user) => {
    const userObj = {
      email: user.email,
      password: user.password
    };

    return axiosInstance.post('users/login', userObj);
  };

  const registerUser = (user) => {
    const userObj = {
      email: user.email,
      password: user.password
    };
    if(user.profileImageUrl) {
      userObj.profileImageUrl = user.profileImageUrl;
    }
    return axiosInstance.post('users', userObj);
  };

  return ({
    addressLookup,
    createCard,
    uploadFile,
    registerUser,
    allRoars,
    getRoar,
    myRoars,
    loginUser
  });
};

export default {
  create,
};

