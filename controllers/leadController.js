const nodemailer = require('nodemailer')
const Lead = require('../models/leadModel');

exports.getLeads = async (req, res) => {
    const result = await Lead.find({}, 'name phone email');

    if (!result) {
        res.json({error: "Not able to search database."});
    }
    name = [];
    email = [];
    phone = [];
    for(i=0; i < result.length; i++){
        var placeholder = result[i].toObject();
        name[i] = placeholder.name;
        phone[i] = placeholder.phone;
        email[i] = placeholder.email;
    }
    res.render('result.ejs', { name: name, phone: phone, email: email });
};

exports.postLeads = async (req, res) => {
    const lead = new Lead({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        await lead.save()
        greetings(req.body.email, req.body.name);
        res.status(200).redirect(process.env.URL_REDIRECT);
    } catch(err) {
        console.log(err)
        res.status(500).redirect(process.env.URL_REDIRECT);
    }
};

const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'asaladofuturo@gmail.com',
        pass: 'enzodullius'
    }
});

const greetings = (email, name) => {
    var mailOptions = {
        from: 'asaladofuturo@gmail.com',
        to: email,
        subject: 'OBA! inscrição realizada 👏',
        html: `
            <h1 style="display:block;width:100%;text-align:center">Oi ${name}, tudo bem?</h1>
            <h2 style="display:block;width:100%;text-align:center">Sua inscrição foi realizada com sucesso!</h2>
            <p style="max-width:600px;margin:auto;text-align:justify">Obrigado por se inscrever para nosso serviço! Nossos representantes vão entrar em contato!
            </p>
            <p style="max-width:600px;margin:10px auto;text-align:justify">Vamos juntos melhorar a educação no Brasil</p>
            <br>
            <p style="max-width:600px;margin:auto;text-align:justify">Juntos, somos mais!</p>
            <p style="max-width:600px;margin:auto;text-align:justify"><b>Equipe A Sala do Futuro</b></p>
            `
    };

    mail.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}