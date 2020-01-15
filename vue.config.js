let path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('a', resolve('/alalog')) // @ 符号代表 src的绝对路径
    }
}