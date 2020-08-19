
const _ = require("lodash")

// add date time for each of the options
function convertToFlags(data, flagMap) {
  const dateString = new Date(Date.now())
    .toISOString()
    .slice(0, 7)

  const fiscaRequestObj = {
    persons: {},
  }
  const mapEntities = flagMap.entities
  const mapFamilies = flagMap.families
  const mapFlags = flagMap.flags

  if (data && typeof data === 'object') {
    // set up entities and their calculation flags within the request obj
    for(const entity in mapEntities){
      const calculatableFieldsForEntity = {}
      // loop over the fields to calculate array for the entity and convert to open fisca format
      for (const benefit in mapEntities[entity]){
        calculatableFieldsForEntity[mapEntities[entity][benefit]] = {
          [dateString]: null,
        }
      }
      fiscaRequestObj.persons[entity] = calculatableFieldsForEntity
    }

    // loop over the flags map and convert data
    for (const dataKey in mapFlags){
      // check if the key exists in the data obj
      const valueForDataKey = data[dataKey]
      if ( valueForDataKey){
        // if it does exist then for each entity we convert to the flags based on the value
        for(const entity in mapFlags[dataKey]){
          // if the entity exists and there is a flag map for the value
          const flagMapForEntity = mapFlags[dataKey][entity]
          if(fiscaRequestObj.persons[entity] && flagMapForEntity[valueForDataKey] ){
            for (const flag in flagMapForEntity[valueForDataKey]){
              fiscaRequestObj.persons[entity][flag] = {
                [dateString]: flagMapForEntity[valueForDataKey][flag],
              }
            }
          }
        }
      }
    }

    const entitiesPresent = []
    for (const entity in fiscaRequestObj.persons){
      // if the number of keys for the entity is the same as the number of benefits
      // delete the entity from the request object since there is nothing to calculate
      if(Object.keys(fiscaRequestObj.persons[entity]).length === mapEntities[entity].length){
        delete fiscaRequestObj.persons[entity]
      }
      else{
        entitiesPresent.push(entity)
      }
    }

     if( entitiesPresent.length > 1 && mapFamilies){
       // add families to the request object
       const families = {}
       let familiesPresent = false
       for(const family in mapFamilies){
         const familyObj = mapFamilies[family]
         // compare entities array, if they are the same add the family to the request obj
         if(_.isEqual(entitiesPresent.slice().sort(), familyObj.entities.slice().sort())){
           families[family] = familyObj.data
           familiesPresent = true
         }
       }

       if(familiesPresent){
         fiscaRequestObj.families = families
       }
     }


  }

  return fiscaRequestObj
}

module.exports = {
  convertToFlags,
}
