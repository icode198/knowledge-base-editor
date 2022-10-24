import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DiseaseItem from '../diseases/DiseaseItem';
import RiskFactorForm from '../disease/RiskFactorForm';
import RiskFactorItem from '../disease/RiskFactorItem';
import { getDisease } from '../../actions/disease';

const RiskFactor = ({ getDisease, disease: { disease, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getDisease(id);
  }, [getDisease, id]);

  return loading || disease === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/diseases" className="btn">
        Back To Diseases
      </Link>
      <DiseaseItem disease={disease} showActions={false} />
      <RiskFactorForm diseaseId={disease._id} />
      <div className="riskfactors">
        {disease.riskFactors.map((riskFactor) => (
          <RiskFactorItem key={riskFactor._id} riskFactor={riskFactor} diseaseId={disease._id} />
        ))}
      </div>
    </section>
  );
};

RiskFactor.propTypes = {
  getDisease: PropTypes.func.isRequired,
  disease: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  disease: state.disease
});

export default connect(mapStateToProps, { getDisease })(RiskFactor);
