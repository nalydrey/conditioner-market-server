// Сравнивает входящий обьект с массивом таких же обьектов
// objIn - новый обьект который проверяется
// objectCompare - массив обьектов с которыми сверяется новый обьект
const isUnique = (objIn, objectCompare) => {
   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', objectCompare)
   if (objectCompare){
      return !objectCompare.some(obj =>
          Object.keys(objIn).every(key =>
              typeof obj[key] !== 'object' && objIn[key]===obj[key]))
   }
   else return true
}

const isUniqueArr = (element, array) => {
      return !array.some(elem => elem === element)
}

module.exports = {
   isUniqueObj: isUnique,
   isUniqueArr
}