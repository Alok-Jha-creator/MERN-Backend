# api-50
## features
 ### Authentication and Authorization
    - update my Profile / access the other fetures allowed
    -Logout

### Multer
    `uploader().none()`-> content type ->multipart/form data but no file upload
    `upload().single(filedName)` -> content Type => multipart/form-data and `fieldName` has one file
    `uploader().array(fieldName,[config])` ->content-type => multipart/form-data and `filedName` can have multer multiple files at a time 
    `uploader().field([{name:fieldName , limit: }])` -->


#Query in mongo db (Shell)
### Create (**C**)
    - One row/document at a time
     - `db.<collectionName>.insertOne(JSONObject)`
     - e.g. `db.users.insertOne({name:"",email:"",password:"",role:"",})`
        -return ->Acknownlegement ({insertId:"",acknowlegment:boolean})
        -add_id to our data =>type ObjectId instance(alpha numeric hex) 

    - Multiple rows/document at a time
     -`db.<collectionName>.insertMany([Object]);`
     -e.g `db.users.insertMany([{name:"",email:"",password:"",role:""},{name:"",email:"",password:"",role:"",}])`
        -return ->Acknownlegement ({insertId:["",""],acknowlegment:boolean})
### Read (**R**)

    -`db.<collectionName>.find(filter,projection,options)`
      -filter type=> json where 
    -`db.<collectionName>.findOne(filter,projection,options)`
        ```
        Projection ~SELECT ....
        ```
    -```json
        {
            key:"value"     // key = "value"
        }

        {
            key1:"value2"     // key1 = "value1" AND "key2"="value2"
        }

        {
            $op: "expression"
        }

        {
           key: {$op: "expression"}
        }
        $lt, $gt , $lte ,$gte ,$eq,$ne,$in,$nin,$and ,$or ,$regex
            eg. age:{ $lt:18 }   another eg. {$and:[ {role:"admin",{address:"kathmandu"}} ]}
    ```


### Update (**U**)
    -`db.<collectionName>.updateOne(filter,{$set: JsonObj},{upsert:1,0})`
    -`db.<collectionName>.updateMany(filter,{$set: JsonObj},{upsert:1,0})`

### Delete (**D**)
    -`db.<collectionName>.deleteOne(filter)`
    -`db.<collectionName>.deleteMany(filter)`

### Aggregation pipeline
    -staged Query
     -pipeline
        [
            {pipeline}
        ]