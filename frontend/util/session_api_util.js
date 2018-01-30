export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const fetchCompanies = (user_id) => (
  $.ajax({
    method: 'GET',
    url: `/api/companies/`,
    data: { user_id }
  })
);

export const addCompany = (company_id, user_id) => (
  $.ajax({
    method: 'POST',
    url: `/api/companies/`,
    data: { user_id, company_id }
  })
);

export const removeCompany = (company_id, user_id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/companies/`,
    data: { user_id, company_id }
  })
);