const express = require('express');

exports.getMainPage = (req, res) => {
  res.status(200).json({
    status: '200',
    message: 'Great stuff',
  });
};
exports.postMainPage = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Not Implemented',
  });
};
