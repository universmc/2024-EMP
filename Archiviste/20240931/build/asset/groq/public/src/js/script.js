const tf = require('@tensorflow/tfjs-node');
const config = require('./config.json');

(async () => {
  try {
    const model = await tf.loadLayersModel(config.modelPath);
    document.getElementById('modelLoaded').textContent = 'Yes';
  } catch (error) {
    console.error('Error loading model:', error);
  }
})();
