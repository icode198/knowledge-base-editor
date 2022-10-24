import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSymptom } from '../../actions/disease';

const SymptomForm = ({ diseaseId, addSymptom }) => {
  const [symptomName, setSymptomName] = useState('');
  const [symptomDesc, setSymptomDesc] = useState('');

  return (
    <div className='disease-form'>
      <div className='bg-primary p'>
        <h3>Add a symptom</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addSymptom(diseaseId, { symptomName, symptomDesc });
          setSymptomName('');
          setSymptomDesc('');
        }}
      >
        <input
          type="text"
          placeholder="Symptom name"
          name="symptomName"
          value={symptomName}
          onChange={e => setSymptomName(e.target.value)}
        />
        <textarea
          name='symptomDesc'
          cols='30'
          rows='5'
          placeholder='Symptom description'
          value={symptomDesc}
          onChange={e => setSymptomDesc(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

SymptomForm.propTypes = {
  addSymptom: PropTypes.func.isRequired
};

export default connect(
  null,
  { addSymptom }
)(SymptomForm);
