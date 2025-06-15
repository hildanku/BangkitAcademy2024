const extractSongData = (payload) => {
    const {
        title, year, genre, performer, duration, albumId,
    } = payload
    return { title, year, genre, performer, duration, albumId }
}

module.exports = extractSongData
