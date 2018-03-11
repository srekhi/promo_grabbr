export const fetchCompanies = () => (
  $.ajax({
    method: 'GET',
    url: `/api/user_companies`,
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
);

export const addCompanies = (company_names) => (
  $.ajax({
    method: 'PUT',
    url: `/api/user_companies`,
    data: { company_names },
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
);

export const removeCompanies = (company_names) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/user_companies`,
    data: { company_names },
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
);
