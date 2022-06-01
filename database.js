const mysql= require('mysql')

const mysqlConnection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    port:3309,
    password:"",
    database:"MiniProject",
    connectionLimit:10
})
// pool.query('select * from library',(err,result,fields) => {
// if(err){
//     return console.log(err.message)   
// }
// return console.log(result)
// })


mysqlConnection.connect((err) =>{
    if(err) console.log(err.message)
    else console.log('Connected')
})

module.exports=mysqlConnection