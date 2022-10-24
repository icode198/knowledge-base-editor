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
} from '../actions/types';

const initialState = {
  diseases: [],
  disease: null,
  loading: true,
  error: {}
};

function diseaseReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISEASES:
      return {
        ...state,
        diseases: payload,
        loading: false
      };
    case GET_DISEASE:
      return {
        ...state,
        disease: payload,
        loading: false
      };
    case ADD_DISEASE:
      return {
        ...state,
        diseases: [payload, ...state.diseases],
        loading: false
      };
    case DELETE_DISEASE:
      return {
        ...state,
        diseases: state.diseases.filter((disease) => disease._id !== payload),
        loading: false
      };
    case DISEASE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_RISKFACTOR:
      return {
        ...state,
        disease: { ...state.disease, riskFactors: payload },
        loading: false
      };
    case REMOVE_RISKFACTOR:
      return {
        ...state,
        disease: {
          ...state.disease,
          riskFactors: state.disease.riskFactors.filter(
            (riskFactor) => riskFactor._id !== payload
          )
        },
        loading: false
      };
    case ADD_SYMPTOM:
      return {
        ...state,
        disease: { ...state.disease, symptoms: payload },
        loading: false
      };
    case REMOVE_SYMPTOM:
      return {
        ...state,
        disease: {
          ...state.disease,
          symptoms: state.disease.symptoms.filter(
            (symptom) => symptom._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

export default diseaseReducer;
