const express = require('express');
const Crew = require('../models/crewModule');
const nodemailer = require('nodemailer');
const Flight = require('../models/flightModule');
const fs = require('node:fs');

exports.createCrewMember = async (req, res) => {
  try {
    const newCrewMember = await Crew.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user: newCrewMember,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getCrewMembers = async (req, res) => {
  try {
    const CrewMembers = await Crew.find(req.query);

    res.status(200).json({
      status: 'success',
      data: {
        CrewMembers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getOneCrewMember = async (req, res) => {
  try {
    const CrewMember = await Crew.findById(req.params.id);
    if (!CrewMember) {
      return res.status(404).json({
        status: 'fail',
        message: 'Crew member was not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        CrewMember,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.updateCrewMember = async (req, res) => {
  try {
    const CrewMemberUpdated = await Crew.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!CrewMemberUpdated) {
      return res.status(404).json({
        status: 'fail',
        message: "Couldn't update crew member not found",
      });
    }

    const flight = await Flight.findById(req.body.FlightNumber);

    // This is ❌TEST❌ emails !!!!!!!!!!!! :📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩

    // var transporter = nodemailer.createTransport({
    //   host: 'live.smtp.mailtrap.io',
    //   port: 587,
    //   auth: {
    //     user: 'api',
    //     pass: 'f7f6e30e16cfa325589b224c1f10e959',
    //   },
    // });

    // This is real emails !!!!!!!!!!!! :📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: 'f7f6e30e16cfa325589b224c1f10e959',
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main(
      email,
      name,
      role,
      flightHours,
      flightNumber,
      aircraftType,
      from,
      to,
      weather,
      departure,
      arriving
    ) {
      if (!email) email = 'repiklleonid@gmail.com';
      const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Details</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #007bff;
        text-align: center;
      }
      p {
        margin-bottom: 10px;
      }
      strong {
        color: #007bff;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Flight Details</h1>
      <p><strong>Hello ${name},</strong></p>
      <p>You are a ${role} and you have ${flightHours} hours.</p>
      <p>Flight Number: ${flightNumber}</p>
      <p>Aircraft: ${aircraftType}</p>
      <p>FROM: ${from}, TO: ${to}</p>
      <p>Weather is: ${weather}</p>
      <p>Departing at ${departure} & Arriving at ${arriving}</p>
      <p class="footer">This email is generated automatically. Please do not reply.</p>
    </div>
  </body>
  </html>
`;

      fs.writeFile('test.pdf', content, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File great!');
        }
      });
      // send mail with defined transport object
      const info = await transporter.sendMail({
        // from: '"Maddison Foo Koch 👻" <mailtrap@demomailtrap.com>', // sender address
        from: '"Leo Repik 👻" <info@cabincrew.ca>', // REAL EMAIL ADRESS
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: content, // html body
        attachments: {
          fileName: 'test.pdf',
          filePath: 'test.pdf',
        },
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      fs.unlink('test.pdf', (err) => console.log(err));
    }

    main(
      CrewMemberUpdated.email,
      CrewMemberUpdated.name,
      CrewMemberUpdated.role,
      CrewMemberUpdated.flightHours.total,
      flight.flightNumber,
      flight.aircraftType,
      flight.from,
      flight.to,
      flight.weather,
      flight.departure,
      flight.arriving
    ).catch(console.error);

    res.status(200).json({
      status: 'success',
      data: {
        CrewMemberUpdated,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.deleteCrewMember = async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);

    if (!deletedFlight) {
      return res.status(404).json({
        status: 'fail',
        message: 'Flight not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
