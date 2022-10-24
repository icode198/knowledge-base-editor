import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_DISEASES,
  DISEASE_ERROR,
  DELETE_DISEASE,
  ADD_DISEASE,
  GET_DISEASE,
  ADD_RISKFACTOR,
  REMOVE_RISKFACTOR,
  ADD_SYMPTOM,
  REMOVE_SYMPTOM
} from './types';

// Get diseases
export const getDiseases = () => async (dispatch) => {
  try {
    const res = await api.get('/diseases');

    dispatch({
      type: GET_DISEASES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete disease
export const deleteDisease = (id) => async (dispatch) => {
  try {
    await api.delete(`/diseases/${id}`);

    dispatch({
      type: DELETE_DISEASE,
      payload: id
    });

    dispatch(setAlert('Disease Removed', 'success'));
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add disease
export const addDisease = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/diseases', formData);

    dispatch({
      type: ADD_DISEASE,
      payload: res.data
    });

    dispatch(setAlert('Disease Created', 'success'));
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get disease
export const getDisease = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/diseases/${id}`);

    dispatch({
      type: GET_DISEASE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add risk factor
export const addRiskFactor = (diseaseId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/diseases/riskfactor/${diseaseId}`, formData);

    dispatch({
      type: ADD_RISKFACTOR,
      payload: res.data
    });

    dispatch(setAlert('Risk Factor Added', 'success'));
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete risk factor
export const deleteRiskFactor = (diseaseId, riskFactorId) => async (dispatch) => {
  try {
    await api.delete(`/diseases/riskfactor/${diseaseId}/${riskFactorId}`);

    dispatch({
      type: REMOVE_RISKFACTOR,
      payload: riskFactorId
    });

    dispatch(setAlert('Risk Factor Removed', 'success'));
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add symptom
export const addSymptom = (diseaseId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/diseases/symptom/${diseaseId}`, formData);

    dispatch({
      type: ADD_SYMPTOM,
      payload: res.data
    });

    dispatch(setAlert('Symptom Added', 'success'));
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete symptom
export const deleteSymptom = (diseaseId, symptomId) => async (dispatch) => {
  try {
    await api.delete(`/diseases/symptom/${diseaseId}/${symptomId}`);

    dispatch({
      type: REMOVE_SYMPTOM,
      payload: symptomId
    });

    dispatch(setAlert('Symptom Removed', 'success'));
  } catch (err) {
    dispatch({
      type: DISEASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
