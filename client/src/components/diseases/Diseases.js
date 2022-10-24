import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DiseaseItem from './DiseaseItem';
import DiseaseForm from './DiseaseForm';
import { getDiseases } from '../../actions/disease';

const Diseases = ({ getDiseases, disease: { diseases } }) => {
  useEffect(() => {
    getDiseases();
  }, [getDiseases]);

  return (
    <section className="container">
      <h1 className="large text-primary">Diseases</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to our Knowledge base
      </p>
      <DiseaseForm />
      <div className="diseases">
        {diseases.map((disease) => (
          <DiseaseItem key={disease._id} disease={disease} />
        ))}
      </div>
    </section>
  );
};

Diseases.propTypes = {
  getDiseases: PropTypes.func.isRequired,
  disease: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  disease: state.disease
});

export default connect(mapStateToProps, { getDiseases })(Diseases);
