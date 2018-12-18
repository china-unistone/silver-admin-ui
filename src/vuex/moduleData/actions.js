/**
 * Created by Jeff on 18/08/07.
 */
import * as types from '../mutation-types'

const actions = {
  setScenicLevel: ({ commit }, payload) => {
    commit(types.SET_SCENIC_LEVEL, payload)
  }
}

export default actions
