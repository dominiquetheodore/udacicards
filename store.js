import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/reducers'

export default function configureStore () {
  const middleware = [ ]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }
  const store = createStore(
    reducer,
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./src/reducers/index.js').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
