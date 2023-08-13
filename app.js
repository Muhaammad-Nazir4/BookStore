var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const database = require('./database/sql');


var signUpRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var addEmployeeRouter = require('./routes/addEmployee');
var addRoomRouter = require('./routes/addRoom');
var viewEmployeeRouter = require('./routes/viewEmployee');
var viewRoomRouter = require('./routes/viewRoom');
var viewSpecificRoomRouter = require('./routes/viewSpecificRoom');
var deleteEmployeeRouter = require('./routes/deleteEmployee');
var deleteRoomRouter = require('./routes/deleteRoom');
var viewRoomGuestRouter = require('./routes/viewRoomGuest');
var viewSpecificRoomGuestRouter = require('./routes/viewSpecificRoomGuest');
var viewEmployeeModelRouter = require('./routes/viewEmployeeModel');
var updateEmployeeRouter = require('./routes/updateEmployee');
var viewRoomModelRouter = require('./routes/viewRoomModel');
var updateRoomRouter = require('./routes/updateRoom');
var BookingRouter = require('./routes/guestAddBooking');
var viewAllBookingsRouter = require('./routes/viewAllBookings');
var deleteBookingRouter = require('./routes/deleteBooking');
var approveBookingRouter = require('./routes/approveBooking');
var viewGuestBookingRouter = require('./routes/viewGuestBooking');
var PaymentRouter = require('./routes/paymentStripe');
var GuestStatusBookedRouter = require('./routes/guestStatusBooked');
var CountEmpRouter = require('./routes/countEmp');
var CountRoomRouter = require('./routes/countRoom');
var CountAvRoomRouter = require('./routes/countavRoom');
var CountNavRoomRouter = require('./routes/countnavRoom');
var CountBookingRouter = require('./routes/countBooking');
var CountApBookingRouter = require('./routes/countapBooking');
var CountPenBookingRouter = require('./routes/countpenBooking');
var CountGuestRouter = require('./routes/countGuest');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use((req,res,next)=>{
  res.setHeader ('Access-Control-Allow-Origin','http://localhost:3000' );
  res.setHeader ('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
  res.setHeader ('Access-Control-Allow-Headers', 'Content-Types');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/addEmployee', addEmployeeRouter);
app.use('/addRoom', addRoomRouter);
app.use('/viewEmployee', viewEmployeeRouter);
app.use('/viewRoom', viewRoomRouter);
app.use('/viewSpecificRoom', viewSpecificRoomRouter);
app.use('/deleteEmployee', deleteEmployeeRouter);
app.use('/deleteRoom', deleteRoomRouter);
app.use('/viewRoomGuest', viewRoomGuestRouter);
app.use('/viewSpecificRoomGuest', viewSpecificRoomGuestRouter);
app.use('/viewEmployeeModel', viewEmployeeModelRouter);
app.use('/updateEmployee', updateEmployeeRouter);
app.use('/viewRoomModel', viewRoomModelRouter);
app.use('/updateRoom', updateRoomRouter);
app.use('/guestAddBooking', BookingRouter);
app.use('/viewAllBookings', viewAllBookingsRouter);
app.use('/deleteBooking', deleteBookingRouter);
app.use('/approveBooking', approveBookingRouter);
app.use('/viewGuestBooking', viewGuestBookingRouter);
app.use('/paymentStripe', PaymentRouter);
app.use('/paymentStripe', PaymentRouter);
app.use('/guestStatusBooked', GuestStatusBookedRouter);
app.use('/countEmp', CountEmpRouter);
app.use('/countRoom', CountRoomRouter);
app.use('/countavRoom', CountAvRoomRouter);
app.use('/countnavRoom', CountNavRoomRouter);
app.use('/countBooking', CountBookingRouter);
app.use('/countapBooking', CountApBookingRouter);
app.use('/countpenBooking', CountPenBookingRouter);
app.use('/countGuest', CountGuestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
