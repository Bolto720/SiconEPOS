import {
  SELECT_PRODUCT_GROUP,
  GET_PRODUCT_GROUPS,
} from './types';
import axios from 'axios';

export const selectProductGroup = (productGroup) => {
  return (dispatch, getState) => {
    dispatch({type: SELECT_PRODUCT_GROUP, productGroup: productGroup});
  };
};

export const getProductGroups = () => {
  return (dispatch, getState) => {
   /*  axios
      .get(
        'http://192.168.1.196/Sicon.Sage200.WebAPI/api/Stock/GetProductGroups',
      )
      .then(function (response) {
        dispatch({type: GET_PRODUCT_GROUPS, payload: response.data});
      }); */
  };
};