const http = require('http')
const nodemailer = require('nodemailer')
const SendmailTransport = require('nodemailer/lib/sendmail-transport')
const { send } = require('process')

const server = http.createServer((req, res) => {
  res.end("Students")
})

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'bharathreddyv2003@gmail.com',
        pass:'jgka epvt tkgb hqhx'
    }

})

    transport.sendMail({
        from:"bharathreddyv2003@gmail.com",
        to:"singhnilesh852117@gmail.com",
        text:"this is mail Tree",
        subject:"Mail to sent"

    })

server.listen(3000, () => {
  console.log("Server running on port 3000")
})
