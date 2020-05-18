import { handleResponse } from './handle-response';

function updateStatusOfCase(obj) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      ...obj,
    }),
  };

  return fetchNode(`/api/update_status`, requestOptions).then((response) => {
    return Promise.resolve(response);
  });
}

function getComplainReportList() {
  const requestOptions = {
    method: 'GET',
  };

  return fetchNode(`/api/`, requestOptions).then((response) => {
    return Promise.resolve(response);
  });
}

function getPoliceOfficerList() {
  const requestOptions = {
    method: 'GET',
  };

  return fetchNode(`/api/get_policeofficerslist`, requestOptions).then(
    (response) => {
      return Promise.resolve(response);
    }
  );
}

function updatePoliceOfficer(obj) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      ...obj,
    }),
  };

  return fetchNode(`/api/update_policeofficers`, requestOptions).then(
    (response) => {
      return Promise.resolve(response);
    }
  );
}

function addPoliceOfficer(obj) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ...obj,
    }),
  };

  return fetchNode(`/api/add_policeofficers`, requestOptions).then(
    (response) => {
      return Promise.resolve(response);
    }
  );
}
function regLostReport(obj) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ...obj,
    }),
  };

  return fetchNode(`/api/reg_lost_report`, requestOptions).then((response) => {
    return Promise.resolve(response);
  });
}

function fetchNode(url, options) {
  // performs api calls sending the required authentication headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    headers,
    ...options,
  })
    .then(handleResponse)
    .then((response) => response.json());
}

export const apiService = {
  regLostReport,
  getPoliceOfficerList,
  addPoliceOfficer,
  updatePoliceOfficer,
  getComplainReportList,
  updateStatusOfCase,
};
