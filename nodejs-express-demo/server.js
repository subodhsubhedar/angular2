const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')


app.get('/', (req, res) => res.send('Hello World!'))
// parse application/json
app.use(bodyParser.json())
app.use(cors())



var employees = [
  {
    "empId": 1,
    "firstName": "Erhart",
    "lastName": "Tellenbrok",
    "email": "etellenbrok0@state.tx.us",
    "gender": "Male",
    "ipAddress": "109.162.36.201"
  },
  {
    "empId": 2,
    "firstName": "Neil",
    "lastName": "Peattie",
    "email": "npeattie1@g.co",
    "gender": "Male",
    "ipAddress": "235.89.183.92"
  },
  {
    "empId": 3,
    "firstName": "Zachery",
    "lastName": "Northbridge",
    "email": "znorthbridge2@pbs.org",
    "gender": "Male",
    "ipAddress": "194.112.49.60"
  },
  {
    "empId": 4,
    "firstName": "Corny",
    "lastName": "Woodland",
    "email": "cwoodland3@ibm.com",
    "gender": "Female",
    "ipAddress": "104.140.216.174"
  },
  {
    "empId": 5,
    "firstName": "Abbie",
    "lastName": "Jayes",
    "email": "ajayes4@chicagotribune.com",
    "gender": "Male",
    "ipAddress": "201.19.63.135"
  },
  {
    "empId": 6,
    "firstName": "Lisetta",
    "lastName": "Coll",
    "email": "lcoll5@google.co.uk",
    "gender": "Female",
    "ipAddress": "209.9.118.193"
  },
  {
    "empId": 7,
    "firstName": "Almeta",
    "lastName": "Vickers",
    "email": "avickers6@msu.edu",
    "gender": "Female",
    "ipAddress": "203.155.191.189"
  },
  {
    "empId": 8,
    "firstName": "Roselin",
    "lastName": "Balling",
    "email": "rballing7@cdbaby.com",
    "gender": "Female",
    "ipAddress": "195.31.102.30"
  },
  {
    "empId": 9,
    "firstName": "Gwenneth",
    "lastName": "Glandon",
    "email": "gglandon8@ftc.gov",
    "gender": "Female",
    "ipAddress": "148.132.17.93"
  },
  {
    "empId": 10,
    "firstName": "Hardy",
    "lastName": "Rampling",
    "email": "hrampling9@yolasite.com",
    "gender": "Male",
    "ipAddress": "207.250.73.170"
  }
];

app.get('/employees', (req, res) => {
  console.log("express js server get method called !");
  res.json(employees);
})

app.post('/employees', (req,res) => {
  var employee = req.body;
  console.log("Request received to add emp : "+employee.firstName);
  employees.push(employee)
  res.json(employees);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))