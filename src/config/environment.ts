
type requestType = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

interface IConfig {
    method: string;
    body?: BodyInit;
  }

const client = async function (
  endpoint: string,
  requestType: requestType,
  body?: BodyInit,
): Promise<any> {
  const config: IConfig = {
    method: requestType,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await window.fetch(endpoint, config);
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export { client };