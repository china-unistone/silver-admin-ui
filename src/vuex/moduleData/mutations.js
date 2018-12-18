/**
 * Created by Jeff on 17/10/29.
 */
import * as types from '../mutation-types'

const mutations = {
  [types.SET_SCENIC_LEVEL] (state, payload) {
    state.scenicLevel = payload
  }
}

export default mutations
