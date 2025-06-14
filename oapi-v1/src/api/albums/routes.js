const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.storeAlbum,
    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.updateAlbumById,
    },
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.deleteAlbumById,
    },
    {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.getAlbumById,
    },

]

module.exports = routes
