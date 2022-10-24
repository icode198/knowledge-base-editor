import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteSymptom } from '../../actions/disease';

const SymptomItem = ({
  diseaseId,
  symptom: { _id, symptomName, symptomDesc, user, date },
  auth,
  deleteSymptom
}) => (
  <div className="bg-white p-1 my-1">
    <div></div>
    <div>
      <p className="my-1">{symptomName}: {symptomDesc}</p>
      <p className="disease-date">Added on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteSymptom(diseaseId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

SymptomItem.propTypes = {
  diseaseId: PropTypes.string.isRequired,
  symptom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteSymptom: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteSymptom })(SymptomItem);
