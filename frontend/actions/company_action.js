export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';
export const RECEIVE_COMPANY = 'RECEIEVE_COMPANY';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';

export const receiveCompany = company => ({
  type: RECEIEVE_COMPANY,
  company
});

export const receiveCompanies = companies => ({
  type: RECEIEVE_COMPANIES,
  companies
});

export const clearCompanies = () => ({
  type: CLEAR_COMPANIES
});

export const fetchCompanies = () => ({ // get the companies that the user is already subscribed to
});

export const addCompany = () => ({ /
});
