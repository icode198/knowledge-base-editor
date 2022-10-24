import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DiseaseItem from '../diseases/DiseaseItem';
import SymptomForm from '../disease/SymptomForm';
import SymptomItem from '../disease/SymptomItem';
import { getDisease } from '../../actions/disease';

const Symptom = ({ getDisease, disease: { disease, loading } }) => {
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
      <SymptomForm diseaseId={disease._id} />
      <div className="symptoms">
        {disease.symptoms.map((symptom) => (
          <SymptomItem key={symptom._id} symptom={symptom} diseaseId={disease._id} />
        ))}
      </div>
    </section>
  );
};

Symptom.propTypes = {
  getDisease: PropTypes.func.isRequired,
  disease: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  disease: state.disease
});

export default connect(mapStateToProps, { getDisease })(Symptom);
