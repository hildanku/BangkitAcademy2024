const routes = (handler) => [
    {
        method: 'POST',
        path: '/users',
        handler: handler.storeUser,
    },
]

module.exports = routes
