import * as Parse from 'parse/node'


export const ParseObjectSearch = (ParseObject: string, filter) => {
    const query = new Parse.Query(ParseObject)

    query.limit((filter && filter.limit) ? filter.limit : 10)

    if (filter) {
        query.skip(filter.skip || 0)

        if (filter.near) {
            const point = new Parse.GeoPoint({
                latitude: filter.near.location.latitude,
                longitude: filter.near.location.longitude,
            })
            query.withinKilometers(filter.near.field || 'location',
                point, filter.near.distance ? filter.near.distance : 100)
            query.ascending(filter.near.field || 'location')
            //_query.withinKilometers('location', point, distance);
            //if (params.unit && params.unit === 'km') {
            //    _query.withinKilometers('location', point, distance);
            //} else {
            //    _query.withinMiles('location', point, distance);
            //}
        }

        if (filter.orderBy) {
            (filter.orderBy.order === 'DESC') ? query.descending(filter.orderBy.field) : query.ascending(filter.orderBy.field)
        } else {
            query.descending('createdAt')
        }

        if (filter.search) {

            switch (filter.search.type) {
                case 'exists':
                    query.exists(filter.search.field)
                    break
                case 'doesNotExist':
                    query.doesNotExist(filter.search.field)
                    break
                case 'startsWith':
                    query.startsWith(filter.search.field, filter.search.value)
                    break
                case 'endsWith':
                    query.endsWith(filter.search.field, filter.search.value)
                    break
                case 'contains':
                    query.contains(filter.search.field, filter.search.value)
                    break
                case 'containedIn':
                    query.containedIn(filter.search.field, filter.search.value)
                    break
                case 'notContainedIn':
                    query.notContainedIn(filter.search.field, filter.search.value)
                    break
                case 'equalTo':
                    query.equalTo(filter.search.field, filter.search.value)
                    break
                case 'notEqualTo':
                    query.notEqualTo(filter.search.field, filter.search.value)
                    break
            }
        }

        if (filter.sortable) {
            switch (filter.sortable.type) {
                case 'lessThan':
                    query.lessThan(filter.sortable.field, filter.sortable.value)
                    break
                case 'lessThanOrEqualTo':
                    query.lessThanOrEqualTo(filter.sortable.field, filter.sortable.value)
                    break
                case 'greaterThan':
                    query.lessThanOrEqualTo(filter.sortable.field, filter.sortable.value)
                    break
                case 'greaterThanOrEqualTo':
                    query.greaterThanOrEqualTo(filter.sortable.field, filter.sortable.value)
                    break
            }
        }
    }

    return query
}