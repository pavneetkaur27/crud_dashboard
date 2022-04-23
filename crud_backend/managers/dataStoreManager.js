
/* 
    {
        pollution_level: {
            type: '',
            very_high: [ 'DELHI' ],
            high: [ 'jakarta', 'bangalore' ]
        },
    }
 */
const attributesPresent = {};

/* 
{
  DELHI: { pollution_level: 'very_high', population: 10 },
  crocin: { category: 'cold', manufacturer: 'GSK' },
  jakarta: { pollution_level: 'high', Longitude: 106 },
  bangalore: { pollution_level: 'high' }
}
 */
const allKeys = {};


function setAttribute(key, obj) {
    const isKeyAlreadyPresent = Object.keys(allKeys).includes(key);
    for (const attribute in obj) {
        let type = typeof obj[attribute];
        let value = obj[attribute];
        if (attributesPresent[attribute]) {
            /* check type */
            if (attributesPresent[attribute].type !== type) {
                console.error("Type invalid", key, attribute, obj[attribute]); 
                delete obj[attribute];
                continue;
            }
            if (attributesPresent[attribute][value]) {  // value is already present
                attributesPresent[attribute][value].push(key);
            } else {
                attributesPresent[attribute][value] = [];
                attributesPresent[attribute][value].push(key);
            }
        } else {
            const attributeObj = {
                type
            };
            attributeObj[value] = [];
            attributeObj[value].push(key);
            attributesPresent[attribute] = attributeObj;
        }
    }
    if (isKeyAlreadyPresent) {
        console.log("Key already present", key);
        for (const attribute in obj) {
            allKeys[key][attribute] = obj[attribute];  
        }
    } else {
        allKeys[key] = obj;   
    }
}


function fetchKey(keyToSeacrh, subKey) {
    if (!allKeys[keyToSeacrh]) {
        return "Key doesn't exist";
    }
    if (subKey) {
        if (allKeys[keyToSeacrh][subKey]) {
            return allKeys[keyToSeacrh][subKey];
        } 
        return "Subkey doesn't exist";
    }
    return allKeys[keyToSeacrh];
}

/* o(1) */
function fetchSecondaryIndex(attribute, value) {
    if (attributesPresent[attribute] && attributesPresent[attribute][value]) {
        return attributesPresent[attribute][value];
    }   
    return "No Secondary index present";
}

function deleteKey(key) {
    if (!allKeys[key]) {
        console.log("Key already deleted, ", key);
        return;
    }
    const attributes = allKeys[key];
    for (const attribute in attributes) {
        let value = attributes[attribute];
        if (attributesPresent[attribute] && attributesPresent[attribute][value]) {  
            let listOfKeys = attributesPresent[attribute][value];
            // if (listOfKeys.length == 1) {   /* because no other key has this attribute */
            //     delete attributesPresent[attribute];
            //     continue;
            // }
            listOfKeys = listOfKeys.filter((li) => li != key);
            attributesPresent[attribute][value] = listOfKeys;
        }
    }
    delete allKeys[key];
}


/* inserting a key */
const key1 = 'DELHI';
const obj1 = {
    pollution_level: 'very_high',
    population: 10 
};
setAttribute(key1, obj1);

/* inserting a key but with population level as number, it will discard polluiton_level because it should be a strinf */
const key2 = 'crocin';
const obj2 = {
    category: 'cold',
    manufacturer: 'GSK',
    pollution_level: 1888,  // passing number should be string
};
setAttribute(key2, obj2);


/* inserting key with already present attribute pollution_level with same data type */
const key3 = 'jakarta';
const obj3 = {
    pollution_level: 'high',
};
setAttribute(key3, obj3);


/* inserting key with already present attribute pollution_level and same data type */
const key4 = 'bangalore';
const obj4 = {
    pollution_level: 'high',
};
setAttribute(key4, obj4);


/* inserting already present key with different data type */
const key5 = 'jakarta';
const obj5 = {
    Longitude: 106,
    // population: 'jsbjds' 
};

setAttribute(key5, obj5);

console.log(allKeys);
console.log(attributesPresent);



/* search key flow */
/* for existing key */
let keyToSearch1 = 'DELHI';
const result1 = fetchKey(keyToSearch1);
console.log("\n======KEY TO SEARCH=============\n");
console.log(result1);

/* for non existent key */
let keyToSearch2 = 'test';
const result2 = fetchKey(keyToSearch2);
console.log("\n======KEY TO SEARCH=============\n");
console.log(result2);


/* for both key and subkey(attribute) */
let subKey1 = 'pollution_level';
const res1 = fetchKey(keyToSearch1, subKey1);
console.log("\n======SUB KEY TO SEARCH=============\n");
console.log(res1);


/* for non existent subkey */
let subKey2 = 'test';
const res2 = fetchKey(keyToSearch1, subKey2);
console.log("\n======SUB KEY TO SEARCH=============\n");
console.log(res2);


/* Secondary index flow */
/* for existing attribute and its value */
const attributeVal1 = 'pollution_level';
const valueOfAttribute1 = 'high';
const response1 = fetchSecondaryIndex(attributeVal1, valueOfAttribute1);
console.log("\n========Secondary indexes===========\n");
console.log(response1);

const attributeVal2 = 'test';
const valueOfAttribute2 = 'test';
const response2 = fetchSecondaryIndex(attributeVal2, valueOfAttribute2);
console.log("\n========Secondary indexes===========\n");
console.log(response2);



/* deletion flow */
console.log("\n========AFTER DELETING A KEY===========\n");
const keyToDelete1 = 'jakarta';
deleteKey(keyToDelete1);
console.log(allKeys);
console.log(attributesPresent);

/* deleting non-existing key */
console.log("\n========AFTER DELETING A KEY===========\n");
const keyToDelete = 'test';
deleteKey(keyToDelete);
console.log(allKeys);
console.log(attributesPresent);



// Delhi: {
// 	Pollution_level: very_high,

// }

// Delhi : [Pollution_level, population]

// pollution_ level: {
// 			type: ‘’
// 			High: [jakarta]
			
// 		}


// module.exports = {
//     // setAttributeHttp
// }