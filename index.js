const express = require('express');
const app = express();
const path=require('path')
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
var mysql=require("mysql")

const connection =require('./database');
const { ppid } = require('process');
const { CLIENT_FOUND_ROWS } = require('mysql/lib/protocol/constants/client');
app.engine('ejs',ejsMate)
app.set("view engine",'ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'))
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get('/branch',(req,res)=>{+
   res.render('branch.ejs')
  
})

app.get('/branch/view',(req,res)=>{
    let sql = `SELECT * FROM BRANCH`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
           res.render('branchView.ejs',{rows})
        }
    })

})

app.post('/branch',(req,res)=>{
    let {Branch_Name,Location}=req.body
    const Branch_Id=Math.floor(1000* Math.random()*9000)
    const sql = `INSERT INTO BRANCH(Branch_Id,BranchName,Location) VALUES("${Branch_Id}","${Branch_Name}","${Location}")`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect('/branch/view')
        }
    })
})

app.put('/branch',(req,res)=>{
    const {Branch_Id,Branch_Name,Location} = req.body;
    const sql = `UPDATE BRANCH SET BranchName ="${Branch_Name}" , Location = "${Location}" WHERE Branch_Id = "${Branch_Id}"`;
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect('/branch/view')
        }
    })
})

app.delete('/branch',(req,res)=>{
    let {Branch_Id} = req.body;
    const sql = `DELETE FROM BRANCH WHERE Branch_Id ="${Branch_Id}"`;
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect('/branch/view')
        }
    })
})

//BOOKS

app.get('/book',(req,res)=>{
    res.render('book.ejs')
})

app.get('/book/view',(req,res)=>{  
    var sql = `SELECT * FROM BOOK`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
           res.render('bookView.ejs',{rows})
        }
    })
})


app.post('/book',(req,res)=>{
    let {Book_Name,Book_Author,Isbn,Book_Edition} =req.body.books;
    const Book_Id=Math.floor(1000* Math.random()*9000)
    console.log(Book_Id,Book_Name,Book_Author,Isbn,Book_Edition)
    var sql = `INSERT INTO BOOK(Book_ID,Book_Name,Book_Author,Isbn,Book_Edition) VALUES("${Book_Id}","${Book_Name}","${Book_Author}","${Isbn}","${Book_Edition}");`
    connection.query(sql,(err,rows,fields)=>{
        if(err) console.log(err.message)
        else {
        res.redirect("/book/view")
        }
    })
})

app.put('/book',(req,res)=>{
    let {Book_Id,Book_Name,Book_Edition} = req.body
    let sql = `Update BOOK SET Book_Name = "${Book_Name}" , Book_Edition ="${Book_Edition}" WHERE Book_Id="${Book_Id}"`;
    connection.query(sql,(err,rows,fields)=>{
        if(err) console.log(err.message)
        else {
        res.redirect("/book/view")
        }
    })

})

app.delete('/book',(req,res)=>{
    const {Book_Id} = req.body;
    let sql=`DELETE FROM BOOK WHERE Book_Id ="${Book_Id}"`;  
    connection.query(sql,(err,rows,fields)=>{
        if(err) console.log(err.message)
        else {
        res.redirect("/book/view")
        }
    })  
})


app.get('/member',(req,res)=>{
    res.render('member.ejs')
})

app.get("/member/view",(req,res)=>{
    let sql = `SELECT * FROM MEMBER NATURAL JOIN BRANCH`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.render("memberView.ejs",{rows});
        }
    })
})

app.post('/member',(req,res)=>{
    let {Member_Name,Member_Email,Member_Phone,Member_Address,Branch_Id}=req.body
    const MEMBER_ID=Math.floor(1000* Math.random()*9000)
    var sql = `INSERT INTO MEMBER(MEMBER_NAME,MEMBER_ID,MEMBER_EMAIL,MEMBER_PHONE,MEMBER_ADDRESS,BRANCH_ID) VALUES("${Member_Name}","${MEMBER_ID}","${Member_Email}","${Member_Phone}","${Member_Address}","${Branch_Id}");`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/member/view");
        }
    })
})

app.put('/member',(req,res)=>{
    let {Member_Name,Member_Email,Member_Phone,Member_Address,Member_Id}=req.body
    var sql=`UPDATE MEMBER SET MEMBER_NAME ="${Member_Name}" , MEMBER_EMAIL ="${Member_Email}" ,Member_PHONE="${Member_Phone}" ,MEMBER_ADDRESS="${Member_Address} WHERE MEMBER_ID="${Member_Id}" `
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/member/view");
        }
    })
})

app.delete('/member',(req,res)=>{
    let {Member_Id} = req.body
    var sql =`DELETE FROM MEMBER WHERE MEMBER_ID ="${Member_Id}"`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/member/view");
        }
    })
})



app.get('/issue',(req,res)=>{
    res.render('issue.ejs')
})

app.get('/issue/view',(req,res)=>{
    let sql =`SELECT * FROM ISSUE,BOOK,Member,BRANCH WHERE ISSUE.Book_Id = BOOK.Book_Id and MEMBER.Member_Id = ISSUE.Member_Id and MEMBER.Branch_Id=BRANCH.Branch_Id;`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.render("issueView",{rows})
        }
    })

})
app.post("/issue",(req,res)=>{
    const {Book_Id,Issue_Date,Return_Date,Member_Id}= req.body
    const Issue_Id = Math.floor(1000* Math.random()*9000)
    var sql =`INSERT INTO ISSUE(Issue_Id,Book_Id,Date_Issue,Date_Expiry,Member_Id) VALUES("${Issue_Id}","${Book_Id}","${Issue_Date}",
    "${Return_Date}","${Member_Id}")`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/issue/view");
        }
    })

})

app.put('/issue',(req,res)=>{
    const{Issue_Id,Issue_Date} = req.body
    var sql = `UPDATE ISSUE SET Issue_Date="${Issue_Date}" WHERE Issue_Id = "${Issue_Id}"`
    var sql=`INSERT INTO STAFF(Staff_id,Staff_Name,Staff_Address,Staff_Gender,Staff_Phone,Branch_Id) VALUES("${Staff_Id}","${Staff_Name}","${Staff_Address}",
    "${Staff_Gender}","${Staff_Phone}","${Branch_Id}");`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/issue/view");
        }
    })

})

app.delete("/issue",(req,res)=>{
    const {Issue_Id} = req.body;
    var sql=`DELETE FROM ISSUE  WHERE Issue_id = "${Issue_Id}"`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/issue/view");
        }
    })


})
app.get('/staff',(req,res)=>{
    res.render('staff.ejs')
})


app.get('/staff/view',(req,res)=>{
    var sql =`SELECT * FROM STAFF NATURAL JOIN BRANCH`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.render("staffView.ejs",{rows});
        }
    })
})

app.post('/staff',(req,res)=>{
    let {Staff_Name,Staff_Address,Staff_Gender,Staff_Phone,Branch_Id} = req.body
    const Staff_Id=Math.floor(1000* Math.random()*9000)
    var sql=`INSERT INTO STAFF(Staff_id,Staff_Name,Staff_Address,Staff_Gender,Staff_Phone,Branch_Id) VALUES("${Staff_Id}","${Staff_Name}","${Staff_Address}",
    "${Staff_Gender}","${Staff_Phone}","${Branch_Id}");`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/staff/view");
        }
    })
})

app.put('/staff',(req,res)=>{
    let{Staff_Id,Phone}=req.body
    var sql=`UPDATE STAFF SET Staff_Phone="${Phone}" WHERE Staff_id="${Staff_Id}";`
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/staff/view");
        }
    })

})

app.delete('/staff',(req,res)=>{
        let {Staff_Id}=req.body;
        var sql=`DELETE FROM STAFF WHERE Staff_id ="${Staff_Id}"`;
    connection.query(sql,(err,rows,fields)=>{
        if (err) console.log(err.message)
        else{
            res.redirect("/staff/view");
        }
    })
})


app.listen(5000,()=>{
    console.log("Server is running")
})