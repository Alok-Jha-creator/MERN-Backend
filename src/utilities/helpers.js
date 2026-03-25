const fs = require('fs');

/*
const randomStringGenerator = (length =100) => {
 const chars ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
 const len = chars.length
 let random ="";
 for(let i=0; i<length; i++){
    let posn = Math.ceil(Math.random() * (len-1));
    random += chars[posn]
 }
 return random;
} 
*/
module.exports ={
   randomStringGenerator : (length =100) => {
      const chars ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
      const len = chars.length
      let random ="";
      for(let i=0; i<length; i++){
         let posn = Math.ceil(Math.random() * (len-1));
         random += chars[posn]
      }
      return random;
   },
   fileDelete:(path)=>{
      if(fs.existsSync(path)){
        return fs.unlinkSync(path);
      }
      return false;
   }
}