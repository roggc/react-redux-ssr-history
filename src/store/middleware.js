console.log('src/store/middleware')

import * as types from '../actions/types'

export const urlQuery = store => next => action => {
  next(action)
  if(action.type != types.ENVIRONMENT_SET)
  {
    const state= store.getState()
    const stringifyed= JSON.stringify(state)
    const encoded= encodeURIComponent(stringifyed)
    history.pushState(encoded, null, '?state='+encoded)
  }
}
