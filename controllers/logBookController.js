const Logbook = require('../models/logBookModule');
const express = require('express');

exports.getAllLogbooks = async (req, res) => {
  try {
    const logbooks = await Logbook.find(req.query);

    res.status(200).json({
      status: 'success',
      data: {
        logbooks,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.createLogbook = async (req, res) => {
  try {
    const newLogbook = await Logbook.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        logbook: newLogbook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getLogbook = async (req, res) => {
  try {
    const logbook = await Logbook.findById(req.params.logbookId);

    if (!logbook) {
      return res.status(404).json({
        status: 'fail',
        message: 'Logbook not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        logbook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.updateLogbook = async (req, res) => {
  try {
    const updatedLogbook = await Logbook.findByIdAndUpdate(
      req.params.logbookId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLogbook) {
      return res.status(404).json({
        status: 'fail',
        message: 'Logbook not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        logbook: updatedLogbook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.deleteLogbook = async (req, res) => {
  try {
    const deletedLogbook = await Logbook.findByIdAndDelete(
      req.params.logbookId
    );

    if (!deletedLogbook) {
      return res.status(404).json({
        status: 'fail',
        message: 'Logbook not found',
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
