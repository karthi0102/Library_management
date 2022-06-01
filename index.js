const express = require('express');
const app = express();
const path=require('path')
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
app.engine('ejs',ejsMate)
app.set("view engine",'ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'))
const { v4: uuidv4 } = require('uuid');

var mysql=require("mysql")

const connection =require('./database');
const { ppid } = require('process');
app.get('/',(req,res)=>{
    
    res.render('home.ejs')
    
})

app.get('/branch',(req,res)=>{+
   res.render('branch.ejs')
  
})

app.post('/branch',(req,res)=>{
    let {Branch_Name,Location}=req.body
    const Branch_Id=uuidv4();
    const sql = `INSERT INTO BRANCH(BRANCH_ID,BRANCHNAME,LOCATION) VALUES("${Branch_Id}","${Branch_Name}","${Location}")`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            console.log(rows)
            res.redirect('/')
        }
    })
})

app.get('/book',(req,res)=>{
   
    res.render('book.ejs')
})

app.get('/view/books',(req,res)=>{  
    var sql = `SELECT * FROM BOOKS`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            console.log(rows)
            res.redirect('/')
        }
    })
})

app.post('/book',(req,res)=>{
    let {Book_Name,Book_Author,Isbn,Book_Edition} =req.body.books;
    const Book_Id=uuidv4()
    console.log(Book_Id,Book_Name,Book_Author,Isbn,Book_Edition)
    var sql = `INSERT INTO BOOK(Book_ID,Book_Name,Book_Author,Isbn,Book_Edition) VALUES("${Book_Id}","${Book_Name}","${Book_Author}","${Isbn}","${Book_Edition}");`
    connection.query(sql,(err,rows,fields)=>{
        if(err) console.log(err.message)
        else {
        console.log(rows)
        res.redirect("/")
        }
    })
})

app.get('/return',(req,res)=>{
    res.render('return.ejs')
})
app.post('/return',(req,res)=>{
    const {Book_Id,Issue_Id,Staff_Id,Member_ID,Book_Name,Issue_Date,Expiry_Date}=req.body;
    const Return_Id = uuidv4();
    var sql= `INSERT INTO RETURN(Book_Id,Issue_Id,Staff_Id,Member_Id,Book_Name,Issue_Date,Expiry_Date,Return_ID) VALUES("${Book_Id}",
    "${Issue_Id}","${Staff_Id}","${Member_ID}","${Book_Name}","${Issue_Date}","${Expiry_Date}","${Return_Id}")`
    connection.query(sql,(err,rows,fields)=>{
        if(err) console.log(err.message)
        else {
        console.log(rows)
        res.redirect("/")
        }
    })
})
app.get('/member',(req,res)=>{
    res.render('member.ejs')
})

app.post('/member',(req,res)=>{
    let {Member_Name,Member_Email,Member_Phone,Member_Address,Branch_Id}=req.body
    const MEMBER_ID=uuidv4();
    var sql = `INSERT INTO MEMBER(MEMBER_NAME,MEMBER_ID,MEMBER_EMAIL,MEMBER_PHONE,MEMBER_ADDRESS,BRANCH_ID) VALUES("${Member_Name}","${MEMBER_ID}","${Member_Email}","${Member_Phone}","${Member_Address}","${Branch_Id}");`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            console.log(rows);
            res.redirect("/");
        }
    })
})

app.get('/issue',(req,res)=>{
    res.render('issue.ejs')
})
app.post("/issue",(req,res)=>{
    const {Book_Id,Book_Name,Issue_Date,Expiry_Date,Member_ID}= req.body
    const Issue_Id = uuidv4();
    var sql =`INSERT INTO ISSUE(Issue_Id,Book_Id,Book_Name,Date_Issue,Date,Expiry,Member_Id) VALUES("${Issue_Id}","${Book_Id}","${Book_Name}","${Issue_Date}","${Expiry_Date}","${Member_ID}")`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            console.log(rows);
            res.redirect("/");
        }
    })

})
app.get('/staff',(req,res)=>{
    res.render('staff.ejs')
})

app.post('/staff',(req,res)=>{
    let {Staff_Name,Staff_Address,Staff_Gender,Staff_Phone,Branch_Id} = req.body
    let Staff_Id=uuidv4();
    var sql=`INSERT INTO STAFF(Staff_id,Staff_Name,Staff_Address,Staff_Gender,Staff_Phone,Branch_Id) VALUES("${Staff_Id}","${Staff_Name}","${Staff_Address}",
    "${Staff_Gender}","${Staff_Phone}","${Branch_Id}");`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            console.log(rows);
            res.redirect("/");
        }
    })
})



app.listen(5000,()=>{
    console.log("Server is running")
})