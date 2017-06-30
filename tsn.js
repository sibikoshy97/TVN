const express=require('express')
const app=express()

app.use(express.static('public'));

var Datastore=require('nedb')
var db=new Datastore({filename:'store.db',autoload:true})

app.set('view engine','ejs')

app.set('port',process.env.PORT||5000)


app.get('/',function (req,res) {
	console.log(__dirname)	
	res.render('signup')
})

app.get('/login',function (req,res) {
	console.log(__dirname)
	res.render('login')
})

app.get('/loginSubmit',function (req,res) {
	var useremail=req.query.email;
	var userpassword=req.query.password;
	var person={
		"Email":useremail,
		"Password":userpassword
	}
	db.find(person,function (err,result) {
		console.log(result)
		if(result.length>0){
			db.find({},function (err,result) {
			res.render('home',{res:result})
		})
		}
		else{
			res.send("email and password wrong")
		}
	
	})
})
app.get('/signupSubmit',function (req,res) {
	Name=req.query.name;
	useremail=req.query.email;
	username=req.query.username;
	userpassword=req.query.password;
	var per={
		"Name":Name,
		"Email":useremail,
		"Username":username,
		"Password":userpassword
	}
	db.insert(per,function (err,result) {
		console.log(result);
		res.render('login')
	})
})

app.get('/profile/:name',function (req,res) {
	var a=req.params.name;
	db.find({Username:a},function (err,result) {
		console.log(result);
		if(result.length!=0){
			res.render('userProfile',{res:result})
		}
		else{
			res.send('no user found with'+a)
		}
	})
})

app.listen(app.get('port'),function () {
	console.log('App is listening at 3000!')
})