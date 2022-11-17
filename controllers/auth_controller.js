const mysql = require('mysql');
const nodemailer = require('nodemailer');
const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});
//register
exports.register = (req,res)=>{
   console.log(req.body);
   const {full_name,email_id,password,confirm_password} = req.body;
   db.query('SELECT email_id FROM users WHERE email_id=?',[email_id],(error,results)=>{
      if(error){
       console.log(error);
      }
      if(results.length>0){
        return res.render('register',{
           message: 'That email is already in use'
        });
      }else if(password!=confirm_password){
         return res.render('register',{
           message: 'Passwords do not match'  
         });
      }
      
      db.query('INSERT INTO users SET ?',{full_name: full_name,email_id:email_id,password: password},(error,resul)=>{
         if(error){
           console.log(error);
         }else {
           console.log(resul);
           context = {
            'email_id':req.body.email_id,
           }
           res.render('loggedin',context);
         }
      });
    });
}
//login
exports.login = function(req,res){
   console.log(req.body);
   const {email_id,password} = req.body;
   db.query('SELECT * FROM users WHERE email_id=? and password=?',[email_id,password],(error,results)=>{
      if(error){
         console.log(error);
      }
      if(results.length>0){
         context = {
            'email_id':req.body.email_id,
         }
         res.render('loggedin',context);
      }else{
         return res.render('login',{
            message: 'Invalid Credentials'
         });
      } 
   });
}
//select
exports.select = function(req,res){
   console.log(req.body);
   const {no_of_seats,class_name,email_id,game_id} = req.body;
   db.query('SELECT * FROM class WHERE no_of_available_seats>=? AND class_name=? AND game_id=?',[no_of_seats,class_name,game_id],(error,results)=>{
       if(error){console.log(error);}
       if(results.length>0){
         db.query('SELECT seat_id,seat_no FROM seat WHERE section=? AND seat_id NOT IN (SELECT seat_id FROM ticket WHERE game_id=?)',[class_name,game_id],(error,resul)=>{
            if(error){console.log(error);} 
            var arr=[];
            var price = 0;
            for(var i=0;i<no_of_seats;i++){
               arr[i]=resul[i];
               price+=results[0].price;
            }
            db.query('SELECT game_title FROM game WHERE game_id=?',[game_id],(err,resu)=>{
                 var x = resu[0].game_title;
                 context = {
                  'data': arr,
                  'class_name': class_name,
                  'price': price,
                  'email_id': email_id,
                  'game_title':x,
                  'game_id':game_id,
               }
               res.render('overview',context);
            });
          });
       }else{
         context ={
            'email_id':email_id,
            'game_id':game_id,
            'message':'Seats not available in selected class',
         }
         return  res.render('book_ticket',context);
       }
   });
}
//cancel
exports.cancel = function(req,res){
   const {ticket_id,email_id,password} = req.body;
   db.query('SELECT * FROM ticket WHERE ticket_id=? and user_id =(SELECT user_id FROM users WHERE email_id=? AND password=?)',[ticket_id,email_id,password],(error,results)=>{
     if(error){console.log(error)};
     if(results.length>0){
       console.log(results);
       db.query('SELECT section FROM seat WHERE seat_id=(SELECT seat_id FROM ticket WHERE ticket_id=?)',[ticket_id],(error,results)=>{
         var x = results[0].section;
         db.query('SELECT price FROM class WHERE class_name=?',[x],(err,resul)=>{
            var y = Math.floor((resul[0].price)/2);
            db.query('SELECT seat_no FROM seat WHERE seat_id=(SELECT seat_id FROM ticket WHERE ticket_id=?)',[ticket_id],(error,results)=>{
               var z = results[0].seat_no;
               db.query('SELECT game_title FROM game WHERE game_id=(SELECT game_id FROM ticket WHERE ticket_id=?)',[ticket_id],(error,results)=>{
                 var w = results[0].game_title;
                 db.query('DELETE FROM booked WHERE ticket_id=?',[ticket_id],(err,results)=>{
                  db.query('DELETE FROM ticket WHERE ticket_id=?',[ticket_id],(err,result)=>{
                     if(err){console.log(err);}
                     var today = new Date();
                     var dd = String(today.getDate()).padStart(2, '0');
                     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                     var yyyy = today.getFullYear();
                     today = yyyy + '/' + mm + '/' + dd;
                        db.query('SELECT id FROM users WHERE email_id=?',[email_id],(err,resu)=>{
                           var user = resu[0].id;
                           db.query('INSERT INTO cancelled SET ?',{user_id:user,game_title:w,cancelled_date:today,ticket_id:ticket_id},(err,results)=>{
                              if(err){console.log(err);}
                              context = {
                                 'ticket_id': ticket_id,
                                 'price':y,
                                 'seat_no':z,
                                 'game_title':w,
                               }
                               res.render('cancelled',context);
                             });
                           }); 
                     });

                 });
                 
                 }); 
               });
             });       
         });
     }else{
       res.render('cancel',{message:'Invalid Credentials'});
     }
   });
}
//take to booking/profile/contact page
exports.todo = function(req,res){
   const {whattodo,email_id,game_id} = req.body;
   if(whattodo == 'view_profile'){
      var count=0,t_id=[],g_title=[],g_date=[],seats=[];
      db.query('SELECT COUNT(*) AS count FROM ticket WHERE user_id=(SELECT id FROM users WHERE email_id=?)',[email_id],(err,result)=>{
         count = result[0].count;
         db.query('SELECT * FROM booked WHERE user_id=(SELECT id FROM users WHERE email_id=?)',[email_id],(err,resu)=>{
          db.query('SELECT * FROM cancelled WHERE user_id=(SELECT id FROM users WHERE email_id=?)',[email_id],(err,resul)=>{
            db.query('SELECT full_name FROM users WHERE email_id=?',[email_id],(err,results)=>{
               var name = results[0].full_name
               context = {
                  'email_id' : email_id,
                  'no_of_bookings':count,
                  'booked':resu,
                  'cancelled':resul,
                  'count':count,
                  'name':name,
                 }
               res.render('profile',context);
            });
            
         });
       });
         
      });
      
   }else if(whattodo=='contact'){
      db.query('SELECT * FROM employee',(err,results)=>{
         context={
            'employee':results,
         }
         res.render('contact',context);
      });
   }else{
      context = {
         'email_id' : email_id,
         'game_id' : game_id,
      }
      res.render('book_ticket',context);
   }
}
//confirm tickets
exports.confirm = function(req,res){ 
   const {class_name,no_of_seats,email_id,game_id,combo1,combo2,combo3,parking_slot} = req.body;
   console.log(req.body);
   var x = 0,game_date = '',name='';
   let arr = [];
   var tic = [];
   var seats = [],quantity=[];
   var amount=0;
   var food_arr= [];
   var y = Math.floor(1000+Math.random()*9000);
   var z = Math.floor(100+Math.random()*900);
   db.query('SELECT id FROM users WHERE email_id=?',[email_id],(error,result)=>{
      x = result[0].id;
      if(error){console.log(error);}
   });
   if(combo1!=''){
      var com_price = 0;
      for(var j=0;j<combo1;j++){
         amount+=20;
         com_price+=20;
      }
      food_arr.push('Stadium Burger Combo');
      quantity.push(combo1);
   }
   if(combo2!=''){
      var com_price = 0;
      for(var k=0;k<combo2;k++){
         amount+=25;
         com_price+=25;
      }
      food_arr.push('Spinna Cheese Combo');
      quantity.push(combo2);
   }
   if(combo3!=''){
      var com_price = 0;
      for(var l=0;l<combo3;l++){
         amount+=40;
         com_price+=40;
      }
      food_arr.push('Chicken Dagwood Combo');
      quantity.push(combo3);
   }
   if(parking_slot=='booked'){
      amount+=5;
   }
   db.query('SELECT * FROM game WHERE game_id=?',[game_id],(err,result)=>{
      game_date = result[0].date_of_game;
      name = result[0].game_title;
      if(err){console.log(err);}
   });
   db.query('SELECT seat_id,seat_no FROM seat WHERE section=? AND seat_id NOT IN (SELECT seat_id FROM ticket WHERE game_id=?)',[class_name,game_id],(error,results)=>{
      if(error){console.log(error);}   
      for(var i=0;i<no_of_seats; i++){
            let obj = [];
            obj['ticket_id'] = y+i;
            obj['seat_id'] = results[i].seat_id;
            obj['game_id'] = game_id;
            obj['user_id'] = x;
            obj['seat_no'] = results[i].seat_no;
            obj['game_title'] = name;
            obj['date_of_game'] = game_date;
            arr.push(obj);
            tic[i] = y+i;
            seats[i] = results[i].seat_no;
         }

      let insert_array = Object.values(arr);
      db.query('INSERT INTO ticket(ticket_id,seat_id,game_id,user_id) VALUES ?',[insert_array.map(arr =>[arr.ticket_id,arr.seat_id,arr.game_id,arr.user_id])],(err,resu)=>{
         if(err){throw err;}
         db.query('SELECT price FROM class WHERE class_name=?',[class_name],(err,resu)=>{
            x = resu[0].price;
            for(var q=0;q<no_of_seats;q++){
              amount+=x;
           }
           db.query('UPDATE class SET no_of_available_seats=no_of_available_seats-? WHERE class_name=? AND game_id=?',[no_of_seats,class_name,game_id],(err,re)=>{
            db.query('INSERT INTO booked(ticket_id,user_id,game_title,game_date,seat_no) VALUES ?',[insert_array.map(arr =>[arr.ticket_id,arr.user_id,arr.game_title,arr.date_of_game,arr.seat_no])],(err,resu)=>{
               context = {
                  'tickets':tic,
                  'seats':seats,
                  'class_name':class_name,
                  'bill':amount,
                  'game_date':game_date,
                  'game_title':name,
                  'parking_spot':z,
                  'email_id':email_id,
                  'food_ordered':food_arr,
                  'quantity':quantity,
                }
                res.render('display',context);
              });
           });
         });
      });
   });
             
}

//to loggedin home
exports.home = function(req,res){
   const {email_id} = req.body;
   context = {
      'email_id':email_id,
   }
   res.render('loggedin',context);
}

//admin
exports.admin = function(req,res){
   console.log(req.body);
   const {email_id,password} = req.body;
   db.query('SELECT * FROM admin WHERE email_id=? and password=?',[email_id,password],(error,results)=>{
      if(error){
         console.log(error);
      }
      if(results.length>0){
         context = {
            'email_id':req.body.email_id,
         }
         res.render('cancel_game',context);
      }else{
         return res.render('admin',{
            message: 'Invalid Credentials'
         });
      } 
   });
}

//cancel game
exports.cancel_game = function(req,res){
   const {game_id} = req.body;
   db.query('SELECT * FROM game WHERE game_id=?',[game_id],(err,results)=>{
      if(err){console.log('err');}
      if(results){
         let mailTransporter = nodemailer.createTransport({
            service: 'outlook',
            auth:{
               user: 'dineshdinu1729@outlook.com',
               pass: 'Dinesh@123'
            }
          });
        db.query('SELECT DISTINCT email_id FROM users inner join ticket on users.id = ticket.user_id WHERE game_id=?;',[game_id],(err,resul)=>{
         if(err){console.log(err);}
         for(var i=0;i < resul.length; i++){
             let details = {
               from: 'dineshdinu1729@outlook.com',
               to: resul[i].email_id,
               subject:'Show cancelled',
               text:'Your game is cancelled. You will recieve refund soon...'
             }
             mailTransporter.sendMail(details,(err)=>{
               if(err){console.log(err);}
               else{console.log('Email sent');}
             });
          }
          db.query('DELETE FROM game WHERE game_id=?',[game_id],(err,result)=>{
            if(err){console.log(err);}
            context = {
              data:results,
            }
            res.render('cancelled_game',context);
         });
        });
       
     }else{
      res.render('cancel_game',{message:'Invalid Credentials'});
     }
   });
}
   