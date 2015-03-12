require('node-jsx').install({extension: '.jsx', harmony: true});

var chai = require('chai');
chai.config.includeStack = true;

// Function Form for Terminating Assertion Properties
chai.use(require('dirty-chai'));
