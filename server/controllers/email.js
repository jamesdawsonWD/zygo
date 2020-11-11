const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const path = require('path');
const { Email } = require('./../models/email');

/**
 * Helper funcitons
 */
const saveTemplate = (item) => item.save();
const createModel = (body, schema) => new schema(body);

/**
 * Endpoints
 */
exports.send = async (req, res) => {
    console.log(req.body);
    const { to, subject, template, email, name, address } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USERNAME, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });

    readFile(path.join(__dirname, '../../templates', `${template}.hbs`), 'utf8')
        .then((file) => {
            const template = hbs.compile(file);
            return template(req.body);
        })
        .then((compiledTemplate) => {
            res.status(201).send({ code: 201, status: 'success', message: 'Template successfully created' });
            transporter.sendMail({
                from: '"SpaceDX" <official@space-dx.com>', // sender address
                to, // list of receivers
                subject,
                text: '', //TODO: extract text only from html template
                html: compiledTemplate,
            });
        })
        // .then(() => createModel(req.body, Email))
        // .then(saveTemplate)
        .then(() => {})
        .catch((err) => console.log(err));
};
