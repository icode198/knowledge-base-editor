import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteRiskFactor } from '../../actions/disease';

const RiskFactorItem = ({
  diseaseId,
  riskFactor: { _id, riskFactorName, riskFactorDesc, user, date },
  auth,
  deleteRiskFactor
}) => (
  <div className="bg-white p-1 my-1">
    <div>
      <p className="my-1">{riskFactorName}: {riskFactorDesc}</p>
      <p className="disease-date">Added on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteRiskFactor(diseaseId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

RiskFactorItem.propTypes = {
  diseaseId: PropTypes.string.isRequired,
  riskFactor: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteRiskFactor: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteRiskFactor })(RiskFactorItem);
