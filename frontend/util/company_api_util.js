export const fetchCompanies = (user_id) => (
  $.ajax({
    method: 'GET',
    url: `/api/companies/`,
    data: { user_id }
  })
);

export const addCompany = (user_id, company_id) => (
  $.ajax({
    method: 'POST',
    url: `/api/companies/`,
    data: { user_id, company_id }
  })
);

export const deleteCompany = (user_id, company_id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/companies/`,
    data: { user_id, company_id }
  })
);