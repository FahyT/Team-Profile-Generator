const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

//helper function to ask user questions to generate a particular team member. Takes one argument 'teamMember', a string of 'Manager', 'Engineer' or 'Intern'.
async function generateTeamMember(teamMember) {
    const answers = await inquirer
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
}

// function to initialize program and loop options
async function init() {

    let continueQ = true;
    let teamMembers = [];

    console.log("Welcome to the team generator! Please enter the team manager's details.")
    teamMembers.push(await generateTeamMember("Manager"));
    while (continueQ) {
        let answer = await inquirer.prompt([
        {
            type: 'list',
            message: `What would you like to do? `,
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
            name: 'choice',
        }]);

        switch(answer.choice) {
            case 'Add an engineer':
                teamMembers.push(await generateTeamMember("Engineer"));
                break;
            case 'Add an intern':
                teamMembers.push(await generateTeamMember("Intern"));
                break;
            case 'Finish building the team':
                continueQ = false;
                break;
        }

        const data = render(teamMembers);
        fs.writeFile(outputPath, data, (err) => { //render HTML and write to output file
            if (err)
              console.log(err);
            else {
              console.log("File written successfully");
            }}); 
    }
}

init();
