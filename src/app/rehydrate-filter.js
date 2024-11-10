import { REHYDRATE, } from 'redux-persist'

export default () => {
  const keys = []
  const includes = key => keys.includes(key)
  return next => action => {
    // if (action.key && action.type === REHYDRATE) {
    //   console.error('rehydrate', action)
    //   // if (includes(action.key)) return undefined
    //   // keys.push(action.key)
    //   return undefined
    // }
    return next(action)
  }
}

// export default () => {
//   const keys = []
//   const includes = key => keys.includes(key)
//   return next => action => {
//     if (action.key && action.type === REHYDRATE && action.errr) {
//       console.error('hydrate err', action)
//       return undefined
//       // if (includes(action.key)) return undefined
//       // keys.push(action.key)
//     }
//     return next(action)
//   }
// }