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