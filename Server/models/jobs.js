const mongoose = require('mongoose');

const { Schema } = mongoose;

const JobSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    jobPosition: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobDesc: {
        type: String,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true,
    },
    skillsArray: {
        type: Array,
        required: true
    },
    information: {
        type: String,
        required: true,
    },
    // recruiterName: {
    //     type: String,
    //     required: true,
    // }

});

module.exports = mongoose.model('JobPost', JobSchema);