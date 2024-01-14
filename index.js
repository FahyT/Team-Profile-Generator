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
        name: 'name'
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s Employee ID: `,
        name: 'id'
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s email address: `,
        name: 'email'
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s Office number : `,
        name: 'officeNumber',
        when: teamMember == "Manager"
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s GitHub username: `,
        name: 'gitHub',
        when: teamMember == "Engineer"
    },
    {
        type: 'input',
        message: `Enter the ${teamMember}'s School: `,
        name: 'school',
        when: teamMember == "Intern"
    },
    ])
    .then((answers) => {
        switch(teamMember) {
            case 'Manager':
              return new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
              break;
            case 'Engineer':
              return new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
              break;
            case 'Intern':
              return new Intern(answers.name, answers.id, answers.email, answers.school);
              break;
          }
      })
}



generateTeamMember("Manager");
