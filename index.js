const MongoClient = require("mongodb").MongoClient;
let projectpms = [{
        "_id": 1,
        "society": "Microsoft",
        "employee": "Liat Bar",
        "error": "",
        "type": ""
    },
    {
        "_id": 2,
        "society": "Apple",
        "employee": "Chen Bar",
        "error": "",
        "type": ""
    },
    {
        "_id": 3,
        "society": "Google",
        "employee": "Ori Gay",
        "error": "",
        "type": ""
    },
    {
        "_id": 4,
        "society": "Ali Express",
        "employee": "Moran Yaron",
        "error": "",
        "type": ""
    }
]
let errorDocument = [{
        "_id": 1,
        "error_type": "Server not responding",
        "responsible": "programmer"
    },
    {
        "_id": 2,
        "error_type": "The customer did not present the required material",
        "responsible": "customer"
    },
    {
        "_id": 3,
        "error_type": "Power outage",
        "responsible": "Force majeure"
    }
]
let typeDoc = [{
        "_id": 1,
        "type": "Data Analyst",
        "responsible": "programmer"
    },
    {
        "_id": 2,
        "type": "Systems engineers and project managers",
        "responsible": "programmer"
    },
    {
        "_id": 3,
        "type": "Information and cyber security",
        "responsible": "programmer"
    }
]

let uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db('PMS');
        const projects = database.collection('projects');
        const errors = database.collection('errors');
        const types = database.collection('types');
        // await add(projects,projectsDocument);
        // await add(errors,errorDocument);
        // await add(types,typeDocument);
        // await addType(projects,1,1);
        // await addType(projects,2,1);
        // await addType(projects,3,2);
        // await addType(projects,4,3);
          // await addError(projects,1,1);
        // await addError(projects,2,2);
        // await addError(projects,4,2);
    } catch (error) {
        console.log('Login failed' + error);
    } finally {
        client.close();
    }
}

async function add(collection,docs) {
    try {
        await collection.insertMany(docs)
        console.log(`Upload performed successfully`)
    } catch (error) {
        console.log(`Upload failed: ${error}`)
    }
}
async function addType(collection,projectID,typeID) {
    try {
        await collection.updateOne({_id:projectID},{$set:{type:typeID}}) 
        console.log(`Upload performed successfully`);
    } catch (error) {
        console.log(`Upload failed: ${error}`);
    }

}
async function addError(collection,projectID,errorID) {
    try {
        await collection.updateOne({_id:projectID},{$set:{error:errorID}}) 
        console.log(`Upload performed successfully`);
    } catch (error) {
        console.log(`Upload failed: ${error}`);
    }

}
async function updateTypeResponsiable(collection,typeID,responsibleValue){
    try {
        await collection.updateOne({_id:typeID},{$set:{responsible:responsibleValue}})
        console.log(`Upload performed successfully`);
    } catch (error) {
        console.log(`Upload failed ${error}`)
    }
}
async function deleteErrorById(collection,errorId){
    try {
        await collection.deleteOne({_id:errorId})
        console.log("Deleted!")
    } catch (error) {
        console.log("not Deleted")
    }
}
async function findError(collection,errorId){
    try {
        let searchResult = await collection.find({error:errorId}).forEach(result => {
            console.log(result)
        })
        console.log("The search ended The document was printed");
    } catch (error) {
        console.log("not Found")
    }
}
async function findType(collection,typeId){
    try {
        let searchResult = await collection.find({type:typeId}).forEach(result => {
            console.log(result)
        })
        console.log("The search ended The document was printed");
    } catch (error) {
        console.log("not Found")
    }
}
run()