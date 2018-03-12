import * as APIUtil from '../util/company_api';

export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';
export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';
export const RECEIVE_COMPANY_ERRORS = 'RECEIVE_COMPANY_ERRORS';
export const CLEAR_COMPANY_ERRORS = 'CLEAR_COMPANY_ERRORS';

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

export const receiveErrors = errors => ({
  type: RECEIEVE_ERRORS,
  errors
});

export const fetchCompanies = () => (dispatch) => (
	APIUtil.fetchCompanies().then((companies) => (
		dispatch(receiveCompanies(companies))
	)), (err) => (
		dispatch(receiveErrors(err.responseJSON))
	)
);

export const addCompanies = (company_names) => (dispatch) => (
	APIUtil.addCompanies(company_names).then((companies) => dispatch(receiveCompanies(companies)))
);
