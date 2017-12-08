
var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var cookie = require('cookie-parser');
var path = require('path');
var body = require('body-parser'); // post moethod
var app = express();
app.use(cookie()); // connect cookie
app.use(body()); // connect body
app.use(session({secret: 'key'})); // connect session

app.set('view engine','jade'); // connect jade template

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "gis_rmutl"
});

app.use('/public', express.static(path.join(__dirname, 'public')))


app.get('/',goIndex,async function(req,res){

	if(session.resultName)
	{
		console.log("Trueeeeee");
		let menu = [
			{txt:'Admin',link:'admin'},
			{txt:'Contact',link:'#section2'},
		]
		res.render('showform',{showmenu:menu});
	}
	else{
		console.log("Elseeeeeee");
		let menu = [
			{txt:'Contact',link:'#section2'},
			{txt:'Sign In',link:'#section3'},
		]
		res.render('showform',{showmenu:menu});
	}

});

app.post('/addContact',function(req,res){
	data={
		contact_name: req.body.name,
		contact_phone: req.body.phone,
		contact_email: req.body.email,
		contact_subject: req.body.subject,
		contact_message: req.body.message
	};
	console.log(Object.keys(data).toString()+"/"+Object.values(data).toString());

		console.log("Connected");
		var sql = "INSERT INTO contact(contact_name,contact_phone,contact_email,contact_subject,contact_message) VALUES('"+data.contact_name+"','"+data.contact_phone+"','"+data.contact_email+"','"+data.contact_subject+"','"+data.contact_message+"')";
		//var sql = "INSERT INTO unit("+Object.keys(data).toString()+") VALUES("+(Object.values(data).toString())+")";
		console.log(sql)
		con.query(sql,function(err,result){
			console.log("insert complete");
		});
	res.redirect('/#section2')
});

app.get('/logout',function(req,res){
	console.log('logout');
	delete session.resultName;
	delete session.resultPassword;
	res.redirect('/');
});

app.all('/admin',function(req,res){
	sql = "SELECT * FROM user";
	con.query(sql,function(err,result){
		if (err) throw err;
		//console.log("result: "+result[1].username)
		let menu = []
		if(session.resultName)
		{
			 menu = [
				{txt:'User',link:'/'},
				{txt:'Add User',link:'#section4'},
				{txt:'Edit User',link:'#section5'},
				{txt:'Logout',link:'logout'},

			]
			str_result = JSON.stringify(result) // result to string
			json_result = JSON.parse(str_result) // string to json
			console.log(json_result)
			res.render('showform',{showmenu:menu,showuser:result});
		}
		else{
			res.redirect('/#section3')
		}
	});
});

app.post('/check_session',function(req,res){
	var post = req.body;
		let un = post.username.toString().replace(/'/g, '').replace(/"/g, '')
		let pw = post.password.toString().replace(/'/g, '').replace(/"/g, '')
		sql = "SELECT * FROM user WHERE username='"+un+"' AND password='"+pw+"' ";
		//console.log("query: "+ con.query(sql));
		con.query(sql,function(err,result){
			if (err) throw err;
			//console.log(err);
			//console.log(sql);
			//console.log("Admin: "+result[0]);
			//console.log(result[0]);
			if(result.length > 0)
			{
				console.log("True result");
				session.resultName = result[0].username;
				session.resultPassword = result[0].password;
				//req.session. = 
					if(un == session.resultName && pw == session.resultPassword)
					{
						console.log("Session complete: "+session.resultName);
						res.redirect('/admin')
					}
					else{
						console.log("Error result");
						res.redirect('/')
					}
			}else{
				console.log("Error result");
				res.redirect('/')
			}
			console.log("Connect: "+session.resultName);

		});
})

app.post('/addUser',function(req,res){
	var post = req.body;
		let add_un = post.add_username.toString().replace(/'/g, '').replace(/"/g, '')
		let add_pw = post.add_password.toString().replace(/'/g, '').replace(/"/g, '')
		let add_na = post.add_name.toString().replace(/'/g, '').replace(/"/g, '')
		let add_ty = post.add_type.toString().replace(/'/g, '').replace(/"/g, '')

		sql2 = "SELECT * FROM user WHERE username='"+add_un+"' ";
		con.query(sql2,function(err,result2){
		if (err) throw err;
			if(result2.length > 0)
			{
				res.send(404,"This user is duplicated in the system.")

			}else{
				sql = "INSERT INTO user(username,password,name,type) VALUE('"+add_un+"','"+add_pw+"','"+add_na+"','"+add_ty+"')";
					con.query(sql,function(err,result){
					if (err) throw err;
					console.log("insert complete");
					res.redirect('/')
				});
			}
		});
});

app.all('/delUser',function(req,res){
		var post = req.body;
			console.log("POST: "+post.del_username)
			sql = "DELETE FROM user WHERE username='"+post.del_username+"' ";
			//console.log("Select Del: "+sql)
			con.query(sql,function(err,result){
				if (err) throw err;
				res.redirect('/admin')		
			});
});

app.all('/editUser',function(req,res){
		var post = req.body;
			console.log("POST: "+post.edit_username)
			console.log("POST: "+post.edit_name)
			console.log("POST: "+post.edit_type)
			sql = "UPDATE user SET username='"+post.edit_username+"',name='"+post.edit_name+"',type='"+post.edit_type+"' WHERE user_id='"+post.edit_userid+"' ";
			//console.log("Select Del: "+sql)
			con.query(sql,function(err,result){
				if (err) throw err;
				res.redirect('/admin')		
			});
});
/*function AuthenUser(req,res,next)
{
	if(session.resultName!='undefined'){
		next();
	}else if(req.body!='undefined'){
		var post = req.body;
		sql = "SELECT * FROM user WHERE User_name='"+post.username+"' AND User_password='"+post.password+"' ";
		con.query(sql,function(err,result){
			if (err) throw err;
			session.resultName = result[0].User_name;
			session.resultPassword = result[0].User_password;

			console.log("Connect: "+session.resultName);
			if(post.username == session.resultName && post.password == session.resultPassword)
			{
				console.log("Session complete: "+session.resultName);
		 		next();
			}else{
				alert('Incorrect Username or Password');
			}
		});
	}else{
		res.sendStatus(403);
	}
}*/

function goIndex(req,res,next)
{
	console.log("goIndex");
	if(session.resultName)
	{
		console.log("True");
		console.log('Welcome: '+session.resultName);
		next();
		
	}else{
		console.log("Flase");
		next();
	}
}

app.listen(8081)

