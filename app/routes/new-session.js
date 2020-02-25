import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class NewSessionRoute extends Route {
  @service
  ladder

  async model () {
    const ladder = await this.ladder.currentLadder()
    return ladder.map(({ name }) => name)
  }

  setupController (controller) {
    super.setupController(...arguments)
    controller.initialize()
  }
}
