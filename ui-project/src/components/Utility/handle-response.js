// import { Link } from "react-router-dom";
export async function handleResponse(response) {
  if (!response.ok) {
    // if ([403].indexOf(response.status) !== -1) {
    //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //   console.log('Unauthorized===== ');
    // }

    const data = await response.text().then((text) => text);
    const error = (response && data) || response.statusText;
    return Promise.reject(error);
  }
  return response;
}
