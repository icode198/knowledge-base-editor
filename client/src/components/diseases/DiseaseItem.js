import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { deleteDisease } from '../../actions/disease';

const DiseaseItem = ({
  deleteDisease,
  auth,
  disease: { _id, diseaseName, diseaseDesc, name, avatar, user, riskFactors, symptoms, date },
  showActions
}) => (
  <div className="disease bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{diseaseName}: {diseaseDesc}</p>
      <p className="disease-date">Added on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
          <Link to={`/riskfactors/${_id}`} className="btn btn-primary">
            Risk factors{' '}
            {riskFactors.length > 0 && (
              <span className="count-of-set">{riskFactors.length}</span>
            )}
          </Link>
          <Link to={`/symptoms/${_id}`} className="btn btn-primary">
            Symptoms{' '}
            {symptoms.length > 0 && (
              <span className="count-of-set">{symptoms.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteDisease(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

DiseaseItem.defaultProps = {
  showActions: true
};

DiseaseItem.propTypes = {
  disease: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteDisease: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteDisease })(
  DiseaseItem
);
