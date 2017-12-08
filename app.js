
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

app.get('/chart',function(req,res){
	sql = "SELECT * FROM user";
			con.query(sql,function(err,result){
			if (err) throw err;
			str_result = JSON.stringify(result) // result to string
			json_result = JSON.parse(str_result) // string to json
			res.json(json_result)
		});
});

app.get('/layer',function(req,res){
	sql = "SELECT * FROM areause2";
			con.query(sql,function(err,result){
			if (err) throw err;
			str_result = JSON.stringify(result) // result to string
			json_result = JSON.parse(str_result) // string to json
			//res.json(result[0].Shape_Area)
			//console.log(result)
			res.json(result)
		});
});

app.get('/',goIndex,function(req,res){
	if(session.resultName)
	{

		console.log("Trueeeeee");
		let menu = [
			{txt:'Admin',link:'admin'},
			{txt:'Contact',link:'#section2'},
			{txt:'Chart',link:'#section6'}
		]
		res.render('showform',{showmenu:menu});
	}
	else{
		console.log("Elseeeeeee");
		let menu = [
			{txt:'Contact',link:'#section2'},
			{txt:'Chart',link:'#section6'},
			{txt:'Sign In',link:'#section3'}
			
		]
		res.render('showform',{showmenu:menu});
	}

});

app.post('/addContact',function(req,res){
	data={
		contact_name: req.body.contact_name,
		contact_phone: req.body.contact_phone,
		contact_email: req.body.contact_email,
		contact_subject: req.body.contact_subject,
		contact_message: req.body.contact_message
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

app.get('/adminEdit',goIndex,function(req,res){
	sql = "SELECT * FROM user"
	con.query(sql,function(err,result){
	if (err) throw err;
		let menu = []
		if(session.resultName)
		{
			var relength = result.length
			console.log(relength)
		    //set default variables
        	var totalStudents = relength,
            pageSize = 3,
            pageCount = totalStudents/pageSize,
            currentPage = 1,
            students = [],
            studentsArrays = [], 
            studentsList = [];
            //Rounding float up
            var pageCountint = Math.ceil(pageCount)

            console.log("pageCountint: "+pageCountint)
	        //genreate list of students
	        for (var i = 0; i < totalStudents; i++) {
	        	console.log(i)
	        	console.log(result[i].user_id)
	            students.push({
	            	user_id:result[i].user_id,
                    username:result[i].username,
                    password:result[i].password,
                    name:result[i].name,
                    type:result[i].type
	            });
	        }
	        //console.log(result)
	        //split list into groups
	        while (students.length > 0) {
	            studentsArrays.push(students.splice(0, pageSize));
	        }

	        //set current page if specifed as get variable (eg: /?page=2)
	        if (typeof req.query.page !== 'undefined') {
	            currentPage = +req.query.page;
	        }

	        //show list of students from group
	        studentsList = studentsArrays[+currentPage - 1];
			console.log("Trueeeeee");
		let menu = [
				{txt:'User',link:'/'},
				{txt:'Add User',link:'/adminAdduser'},
				{txt:'Edit User',link:'/adminEdit'},
				{txt:'Contact User',link:'/adminContact'},
				{txt:'Logout',link:'logout'}
			]
			res.render('editform',{
				showmenu:menu,
				showuser:result,
				students: studentsList,
	            pageSize: pageSize,
	            totalStudents: totalStudents,
	            pageCount: pageCountint,
	            currentPage: currentPage
			});
		}
		else{
			res.redirect('/');
		}
	});
});

app.get('/adminContact',goIndex,function(req,res){
	sql = "SELECT * FROM contact"
	con.query(sql,function(err,result){
	if (err) throw err;
		let menu = []
		if(session.resultName)
		{

			var relength = result.length
		    //set default variables
        	var totalStudents = relength,
            pageSize = 3,
            pageCount = totalStudents/pageSize,
            currentPage = 1,
            students = [],
            studentsArrays = [], 
            studentsList = [];
            var pageCountint = Math.ceil(pageCount)
	        //genreate list of students
	        for (var i = 0; i < totalStudents; i++) {
	            students.push({
	            	contact_id:result[i].contact_id,
                    contact_name:result[i].contact_name,
                    contact_phone:result[i].contact_phone,
                    contact_email:result[i].contact_email,
                    contact_subject:result[i].contact_subject,
                    contact_message:result[i].contact_message
	            });

	        }
	        //console.log(result)
	        //split list into groups
	        while (students.length > 0) {
	            studentsArrays.push(students.splice(0, pageSize));
	        }

	        //set current page if specifed as get variable (eg: /?page=2)
	        if (typeof req.query.page !== 'undefined') {
	            currentPage = +req.query.page;
	        }

	        //show list of students from group
	        studentsList = studentsArrays[+currentPage - 1];
			console.log("Trueeeeee");
			let menu = [
				{txt:'User',link:'/'},
				{txt:'Add User',link:'/adminAdduser'},
				{txt:'Edit User',link:'/adminEdit'},
				{txt:'Contact User',link:'/adminContact'},
				{txt:'Logout',link:'logout'}
			]
			res.render('contactform',{
				showmenu:menu,
				showuser:result,
				students: studentsList,
	            pageSize: pageSize,
	            totalStudents: totalStudents,
	            pageCount: pageCountint,
	            currentPage: currentPage
			});
		}
		else{
			res.redirect('/');
		}
	});
});


app.all('/adminAdduser',function(req,res){
	sql = "SELECT * FROM user";
	con.query(sql,function(err,result){
		if (err) throw err;
		console.log("result: "+result[1])
		let menu = []
		if(session.resultName)
		{
		let menu = [
				{txt:'User',link:'/'},
				{txt:'Add User',link:'/adminAdduser'},
				{txt:'Edit User',link:'/adminEdit'},
				{txt:'Contact User',link:'/adminContact'},
				{txt:'Logout',link:'logout'}
			]
			//str_result = JSON.stringify(result) // result to string
			//json_result = JSON.parse(str_result) // string to json
			//console.log(json_result)
			res.render('adduserform',{
				showmenu:menu,
				showuser:result
			});
		}
		else{
			res.redirect('/')
		}
	});
});

app.all('/admin',function(req,res){
	sql = "SELECT * FROM user";
	con.query(sql,function(err,result){
		if (err) throw err;
		console.log("result: "+result[1])
		let menu = []
		if(session.resultName)
		{
			 menu = [
				{txt:'User',link:'/'},
				{txt:'Add User',link:'/adminAdduser'},
				{txt:'Edit User',link:'/adminEdit'},
				{txt:'Contact User',link:'/adminContact'},
				{txt:'Logout',link:'logout'}

			]
			//str_result = JSON.stringify(result) // result to string
			//json_result = JSON.parse(str_result) // string to json
			//console.log(json_result)
			res.render('showform',{
				showmenu:menu,
				showuser:result
			});
		}
		else{
			res.redirect('/')
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
				res.send(500,"This user is duplicated in the system.")

			}else{
				sql = "INSERT INTO user(username,password,name,type) VALUE('"+add_un+"','"+add_pw+"','"+add_na+"','"+add_ty+"')";
					con.query(sql,function(err,result){
					if (err) throw err;
					console.log("insert complete");
					res.redirect('/admin')
				});
			}
		});
});

app.all('/delUser',function(req,res){
		var post = req.body;
			console.log("POST: "+post.del_username)
			sql = "DELETE FROM user WHERE user_id='"+post.del_userid+"' ";
			//console.log("Select Del: "+sql)
			con.query(sql,function(err,result){
				if (err) throw err;
				res.redirect('/adminEdit')		
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
				res.redirect('/adminEdit')		
			});
});
app.all('/delContact',function(req,res){
		var post = req.body;
			console.log("POST: "+post.del_contact)
			sql = "DELETE FROM contact WHERE contact_id='"+post.del_contactid+"' ";
			//console.log("Select Del: "+sql)
			con.query(sql,function(err,result){
				if (err) throw err;
				res.redirect('/adminContact')		
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
