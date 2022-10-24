import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRiskFactor } from '../../actions/disease';

const RiskFactorForm = ({ diseaseId, addRiskFactor }) => {
  const [riskFactorName, setRiskFactorName] = useState('');
  const [riskFactorDesc, setRiskFactorDesc] = useState('');

  return (
    <div className='disease-form'>
      <div className='bg-primary p'>
        <h3>Add a risk factor</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addRiskFactor(diseaseId, { riskFactorName, riskFactorDesc });
          setRiskFactorName('');
          setRiskFactorDesc('');
        }}
      >
        <input
          type="text"
          placeholder="Risk factor name"
          name="riskFactorName"
          value={riskFactorName}
          onChange={e => setRiskFactorName(e.target.value)}
        />
        <textarea
          name='riskFactorDesc'
          cols='30'
          rows='5'
          placeholder='Risk factor description'
          value={riskFactorDesc}
          onChange={e => setRiskFactorDesc(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

RiskFactorForm.propTypes = {
  addRiskFactor: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRiskFactor }
)(RiskFactorForm);
