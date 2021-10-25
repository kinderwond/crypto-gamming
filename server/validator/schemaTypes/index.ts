import numberTypes from './numbers'
import stringTypes from './strings'
import hashTypes  from './hashes'
import customType  from './custom'
import additional  from './additional'



export default {
    ...numberTypes,
    ...hashTypes,
    custom: customType,
    ...stringTypes,
    ...additional,
}
