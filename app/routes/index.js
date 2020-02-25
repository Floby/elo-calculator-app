import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class IndexRoute extends Route {
  @service ladder

  async model () {
    return await this.ladder.currentLadder()
  }
}
