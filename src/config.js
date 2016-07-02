require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'React Redux Example',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'Vocal Remover of Doom: %s',
      meta: [
        {name: 'description', content: 'Vocal Remover for karaoke, vocal training, and just singing for fun!'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Vocal Remover of Doom'},
        // {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        // {property: 'og:locale', content: 'en_US'},
        // {property: 'og:title', content: 'Vocal Remover of Doom'},
        // {property: 'og:description', content: 'Vocal Remover for karaoke, vocal training, and just singing for fun!'},
        // {property: 'og:image:width', content: '200'},
        // {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
