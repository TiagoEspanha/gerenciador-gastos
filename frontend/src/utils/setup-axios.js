import axios from 'axios';


const defaultObserver = {
  setErrors: (errors) => {
    const isObject = typeof errors === 'object' &&
    !Array.isArray(errors) &&
    errors !== null;

    if (isObject) {
      alert(Object.values(errors));
    } else {
      alert(errors);
    }
  }
};


export const setupAxios = (validationObserver = defaultObserver) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });

  const responseHandlerMiddleware = (response) => {
    console.log('response', response)
    return response;
  };

  const errorHandlerMiddleware = (error) => {
    const { status } = error.response;
    const { errors } = error.response.data;

    if (status === 422) {
      validationObserver.setErrors(errors);
      return;
    }

    if (status >= 500) {
      alert('Erro ao acessar o servidor. Por favor, tente mais tarde');
    }

    return error.response;
    //throw error;
  };

  axiosInstance.interceptors.response.use(
    responseHandlerMiddleware,
    errorHandlerMiddleware
  );

  return axiosInstance;
};
