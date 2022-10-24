const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Disease = require('../../models/Disease');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/diseases
// @desc     Create a disease info
// @access   Private
router.post(
  '/',
  auth,
  check('diseaseName', 'Disease name is required').notEmpty(),
  check('diseaseDesc', 'Disease description is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newDisease = new Disease({
        diseaseName: req.body.diseaseName,
        diseaseDesc: req.body.diseaseDesc,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const disease = await newDisease.save();

      res.json(disease);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/diseases
// @desc     Get all diseases
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const diseases = await Disease.find().sort({ date: -1 });
    res.json(diseases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/diseases/:id
// @desc     Get disease by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({ msg: 'Disease not found' });
    }

    res.json(disease);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/diseases/:id
// @desc     Delete a disease
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({ msg: 'Disease not found' });
    }

    // Check user
    if (disease.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await disease.remove();

    res.json({ msg: 'Disease removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/diseases/riskfactor/:id
// @desc     Add a risk factor on a disease
// @access   Private
router.post(
  '/riskfactor/:id',
  auth,
  checkObjectId('id'),
  check('riskFactorName', 'Disease Name is required').notEmpty(),
  check('riskFactorDesc', 'Disease Description is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const disease = await Disease.findById(req.params.id);

      const newRiskFactor = {
        riskFactorName: req.body.riskFactorName,
        riskFactorDesc: req.body.riskFactorDesc,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      disease.riskFactors.unshift(newRiskFactor);

      await disease.save();

      res.json(disease.riskFactors);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/diseases/riskfactor/:id/:riskfactor_id
// @desc     Delete a risk factor
// @access   Private
router.delete('/riskfactor/:id/:riskfactor_id', auth, async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    // Pull out riskFactor
    const riskFactor = disease.riskFactors.find(
      (riskFactor) => riskFactor.id === req.params.riskfactor_id
    );
    // Make sure riskFactor exists
    if (!riskFactor) {
      return res.status(404).json({ msg: 'Risk factor does not exist' });
    }
    // Check user
    if (riskFactor.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    disease.riskFactors = disease.riskFactors.filter(
      ({ id }) => id !== req.params.riskfactor_id
    );

    await disease.save();

    return res.json(disease.riskFactors);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    POST api/diseases/symptom/:id
// @desc     Add a symptom on a disease
// @access   Private
router.post(
  '/symptom/:id',
  auth,
  checkObjectId('id'),
  check('symptomName', 'Symptom Name is required').notEmpty(),
  check('symptomDesc', 'Symptom Description is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const disease = await Disease.findById(req.params.id);

      const newSymptom = {
        symptomName: req.body.symptomName,
        symptomDesc: req.body.symptomDesc,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      disease.symptoms.unshift(newSymptom);

      await disease.save();

      res.json(disease.symptoms);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/diseases/symptom/:id/:symptom_id
// @desc     Delete symptom
// @access   Private
router.delete('/symptom/:id/:symptom_id', auth, async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    // Pull out symptom
    const symptom = disease.symptoms.find(
      (symptom) => symptom.id === req.params.symptom_id
    );
    // Make sure symptom exists
    if (!symptom) {
      return res.status(404).json({ msg: 'Symptom does not exist' });
    }
    // Check user
    if (symptom.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    disease.symptoms = disease.symptoms.filter(
      ({ id }) => id !== req.params.symptom_id
    );

    await disease.save();

    return res.json(disease.symptoms);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
