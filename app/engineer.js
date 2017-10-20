const _ = require('lodash');
const commands = require('./commands');
const config = require('./config');
const utility = require('./utility');

const Engineer = {
  /**
   * Engineer commands
   */
  commands,

  /**
   * Load configuration from file
   * @param {string} path
   * @return {Promise}
   */
  load(path = 'env.js') {
    return new Promise((resolve) => {
      utility.log.info('app.start');
      utility.log.indent();

      // Load config file
      const options = utility.file.load(path);

      // No config
      if (!options || !options.site) utility.log.fail('error.config', { path: utility.file.path(path) });

      // Configure
      utility.log.info('config.using', { path: utility.file.path(path) });
      _.merge(config.env, options);

      // Set up authentication
      utility.sharepoint.setup().then(resolve);
    });
  },
};

module.exports = Engineer;
