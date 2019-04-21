console.log('src/store/index')

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import {environmentSet} from '../actions/index'
import {urlQuery} from './middleware'

export const getStore= (conf= {isClient:false}, state)=>
{
  let store
  if(conf.isClient)
  {
    const middlewares = [thunk, urlQuery]
    if(!state)
    {
      state = window.__STATE__
      delete window.__STATE__
    }
    store= applyMiddleware(...middlewares)(createStore)(rootReducer, state)
    store.dispatch(environmentSet({isClient:true}))
  }
  else
  {
    const middlewares = [thunk]
    store= applyMiddleware(...middlewares)(createStore)(rootReducer, state)
    if(state)
    {
      store.dispatch(environmentSet({isClient:false}))
    }
  }
  return store
}
