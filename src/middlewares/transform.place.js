export function transformLocation(longitude , latitude) {
    return {
        type: 'Point',
        coordinates: [
            longitude,
            latitude
        ]
    }
}