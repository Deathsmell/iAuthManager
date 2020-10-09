module.exports = (router) => {
    require('./auth')(router)
    require('./users')(router)
}



