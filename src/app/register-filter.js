import { REGISTER } from 'redux-persist'
export default () => {
  const keys = []
  const includes = key => keys.includes(key)
  return next => action => {
    if (action.key && action.type === REGISTER) {
      // console.error('register', action)
      if (includes(action.key)) return undefined
      keys.push(action.key)
      // return undefined
    }
    return next(action)
  }
}