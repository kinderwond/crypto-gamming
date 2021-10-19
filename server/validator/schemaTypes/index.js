const numberTypes = require('./numbers')
const stringTypes = require('./strings')
const hashTypes = require('./hashes')
const customType = require('./custom')
const additional = require('./additional')



module.exports = {
    ...numberTypes,
    ...hashTypes,
    custom: customType,
    ...stringTypes,
    ...additional,
}
