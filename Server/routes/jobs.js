const express = require('express');
const router = express.Router();
const JobPost = require('../models/jobs');
const verifyAuth = require('../middleware/verifyAuth')


router.post('/job-post', verifyAuth, async (req, res) => {

    try {
        let { companyName, logoUrl, jobPosition, salary, jobType, jobLocation, location, jobDesc, aboutCompany, skillsArray, information } = req.body;
        if (!companyName || !logoUrl || !jobPosition || !salary || !jobType || !jobLocation || !location || !jobDesc || !aboutCompany || !skillsArray || !information) {
            return res.status(404).json({
                success: false,
                errormessage: 'All fields are required'
            })
        }

        skillsArray = skillsArray.split(",");

        for (let i = 0; i < skillsArray.length; i++) {
            skillsArray[i] = skillsArray[i].trim();
        }

        const newpost = {
            companyName,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            jobLocation,
            location,
            jobDesc,
            aboutCompany,
            skillsArray,
            information,
        }
        await JobPost.create(newpost);
        res.status(200).json({
            success: true,
            message: " job post created successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error'
        })
    }
})

router.patch('/edit-post/:jobId', async (req, res) => {

    try {
        const jobId = req.params.jobId;
        if (!jobId) {
            res.status(400).json({
                success: false,
                errormessage: ' Bad request'
            })
        }
        // test
        const checkjobid = await JobPost.find({ jobId })
        if (!checkjobid) {
            res.status(400).json({
                success: false,
                errormessage: 'No job found for this jobid'
            })
        }

        let { companyName, logoUrl, jobPosition, salary, jobType, jobLocation, location, jobDesc, aboutCompany, skillsArray, information } = req.body;


        skillsArray = skillsArray.toString().split(",");

        for (let i = 0; i < skillsArray.length; i++) {
            skillsArray[i] = skillsArray[i].trim();
        }

        await JobPost.findByIdAndUpdate({ _id: jobId }, {
            companyName,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            jobLocation,
            location,
            jobDesc,
            aboutCompany,
            skillsArray,
            information
        })
        res.status(200).json({
            success: true,
            message: ' Job edited successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error job edit'
        })
    }

})

router.get('/getjob', async (req, res) => {

    try {

        const search = req.query.search || "";
        let skills = req.query.skills

        if (search.length === 0 && !skills) {
            const jobs = await JobPost.find();
            return res.json({
                jobs
            })
        }
        if (skills && search.length === 0) {
            const jobs = await JobPost.find(
                {
                    skillsArray:
                    {
                        $in: skills
                    }
                }
            );
            return res.json({
                jobs
            })
        }

        if ((!skills || skills.length === 0) && search && search.length != 0) {
            const jobs = await JobPost.find({
                jobPosition: { $regex: search, $options: "i" },
            }
            );
            return res.json({
                jobs
            })
        }

        if (skills && search.length != 0) {
            const jobs = await JobPost.find({
                jobPosition: { $regex: search, $options: "i" },
                skillsArray:
                {
                    $in: skills
                }
            }
            );
            return res.json({
                jobs
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({

            success: false,
            errormessage: ' Internal server error'
        })
    }

})

router.get('/detail-job/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const result = await JobPost.findById({ _id })
        res.json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            errormessage: ' Internal server error'
        })
    }
})
module.exports = router;



// let newskillsArray = skillsArray.toString();
// if (typeof newskillsArray === 'string') {
//     newskillsArray.split(',');
//     for (let i = 0; i < newskillsArray.length; i++) {
//         newskillsArray[i] = newskillsArray[i].trim();
//     }
// }
// else {
//     console.log("Not a vaild string object")
// }
