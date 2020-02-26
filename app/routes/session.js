import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'

export default class SessionRoute extends Route {
  @service session
  async model ({ session_id }) {
    const session = this.session.get(session_id)
    return session
  }

  setupController(controller) {
    super.setupController(...arguments)
    controller.initialize()
  }
}
