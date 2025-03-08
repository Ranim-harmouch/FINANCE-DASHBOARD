const crypto = require('crypto')

const Key = crypto.randomBytes(256).toString('hex')

console.log(Key)