const { VITE_API_URL } = import.meta.env;

const API_URL = VITE_API_URL;

export const APIS: any = {
  AUTH: {
    LOGIN: {
      url: `${API_URL}/users/api/Users/login`,
      method: 'POST',
    },
    SESSION_TOKEN: {
      url: `${API_URL}/users/api/SessionToken`,
      method: 'POST',
    },
  },
  USERS: {
    ADD_USER: {
      url: `${API_URL}/users/api/Users/create`,
      method: 'POST',
    },
    GET_USERS: {
      url: `${API_URL}/users/api/Users/list`,
      method: 'GET',
    },
    GET_USER: {
      url: `${API_URL}/users/api/Users/Get`,
      method: 'GET',
    },
    UPDATE_USER: {
      url: `${API_URL}/users/api/Users/update`,
      method: 'PUT',
    },
    DELETE_USER: {
      url: `${API_URL}/users/api/Users/deactivate`,
      method: 'DELETE',
    },
  },
};
