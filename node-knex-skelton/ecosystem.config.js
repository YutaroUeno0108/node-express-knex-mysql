module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   * https://github.com/Unitech/pm2
   */
  apps: [

    // First application
    {
      name: 'API',
      script: './server.js',
      exec_mode: 'cluster',
      instances: 0,
      max_memory_restart: '100M',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development',
        PORT: '3000',
        LOG_FOLDER_PATH: './logs'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '3000',
        LOG_FOLDER_PATH: './logs'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
