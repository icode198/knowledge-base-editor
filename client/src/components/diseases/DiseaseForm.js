import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDisease } from '../../actions/disease';

const DiseaseForm = ({ addDisease }) => {
  const [diseaseName, setDiseaseName] = useState('');
  const [diseaseDesc, setDiseaseDesc] = useState('');

  return (
    <div className='disease-form'>
      <div className='bg-primary p'>
        <h3>Please add new disease...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addDisease({ diseaseName, diseaseDesc });
          setDiseaseName('');
          setDiseaseDesc('');
        }}
      >
        <input
          type="text"
          placeholder="Disease name"
          name="diseaseName"
          value={diseaseName}
          onChange={e => setDiseaseName(e.target.value)}
        />
        <textarea
          name='diseaseDesc'
          cols='30'
          rows='5'
          placeholder='Disease description'
          value={diseaseDesc}
          onChange={e => setDiseaseDesc(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

DiseaseForm.propTypes = {
  addDisease: PropTypes.func.isRequired
};

export default connect(
  null,
  { addDisease }
)(DiseaseForm);
