import {GET_CUSTOMER_ACCOUNTS, CUSTOMER_SELECTED} from './types';
import axios from 'axios';

export const getCustomerAccounts = (finishedAction) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${getState().settingsReducer.settings.webapiaddress}Customer/GetCustomers`
        )
      .then(function (response) {
        dispatch({type: GET_CUSTOMER_ACCOUNTS, payload: response.data});
        
        if (finishedAction != undefined) {
          finishedAction(response.data);
        }
      });
  };
};

export const customerAccountsRetreived = () => {
  
};

export const customerSelected = (customer) => {
  return (dispatch, getState) => {
    dispatch({type: CUSTOMER_SELECTED, payload: customer});

    getState().stockItemReducer.BasketItems
  };
};
