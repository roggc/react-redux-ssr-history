//src/client

import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import {getStore} from './store/index'
import App from './components/app/index'

const render= (state)=>
{
  const store= getStore({isClient: true}, state)
  hydrate
  (
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  );
}

window.addEventListener('popstate', function(e) {
  const stringState= decodeURIComponent(e.state)
  const state= JSON.parse(stringState)
  render(state)
})

render()
