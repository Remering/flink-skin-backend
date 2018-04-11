export const GlobalType= `
    type Geolocation {
        latitude: Float!
        longitude: Float!
    }
    type Address {
        resume: String
        number: String
        street: String
        district: String
        city: String
        state: String
        country: String
        zipcode: String
        image: String
        imageRegion: String
        geo: Geolocation
    }
    
    enum typeSearch {
        exists
        doesNotExist
        startsWith
        endsWith
        contains
        containedIn
        notContainedIn
        equalTo
        notEqualTo
    }
    
    enum typeSortable {
        lessThan
        lessThanOrEqualTo
        greaterThan
        greaterThanOrEqualTo
    }
    
    enum Order{
        ASC
        DESC
    }
   
   input inputSearch{
        field: String!
        type: typeSearch!
        value: String
   }
   
   input inputSortable{
        field: String!
        type: typeSortable!
        value: Float!
   }
    
    input OrderByFilter {
        field: String!
        order: Order!
    }
    
    input inputFilter {
        skip: Int
        limit: Int
        search: inputSearch,  
        near: inputNear, 
        orderBy: OrderByFilter
        sortable: inputSortable
    }
    
    input InputGeolocation {
        latitude: Float!
        longitude: Float!
    }
    
    input inputNear {
        field: String
        location:  InputGeolocation
        distance: Float
        
    }
`