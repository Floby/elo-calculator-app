import { inject as service } from '@ember/service'
import Modifier from 'ember-modifier'
import delay from 'delay'

export default class TypedElementModifier extends Modifier {
  @service lock

  get ms () {
    return this.args.named.delay || 15
  }

  async didInstall () {
    const styles = this.element.style
    styles.setProperty('visibility', 'hidden')
    await this.lock.withLock('typed-text', async () => {
      await delay(this.ms)
      styles.setProperty('visibility', 'visible')
      await delay(this.ms)
    })
  }

  willRemove () {
  }
}
