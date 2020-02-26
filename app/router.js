import EmberRouter from '@ember/routing/router'
import config from './config/environment'

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('session', { path: 'sessions/:session_id' })
  this.route('new-session')
})
