const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.



const generateTeamMember = (teamMember) => {
    inquirer
    .prompt([{
        type: 'input',
        message: `Enter the ${teamMember}'s name: `,
        name: 'memberName'
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s Employee ID: `,
        name: 'memberID'
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s email address: `,
        name: 'memberEmail'
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s Office number : `,
        name: 'tmOfficeNumber',
        when: teamMember == "Manager"
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s GitHub username: `,
        name: 'tmGitHub',
        when: teamMember == "Engineer"
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s School: `,
        name: 'tmSchool',
        when: teamMember == "Intern"
    },
    ])
    .then((answers) => {
        console.log(answers);
      })
}

generateTeamMember("Manager");
