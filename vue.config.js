const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devServer:{
        host: 'app.template.test'
    },
    transpileDependencies: true,
    lintOnSave:false
})
