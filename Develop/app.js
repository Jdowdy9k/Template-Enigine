const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function selectMember() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select team member to add.",
                name: "choice",
                choices: ["Engineer", "Intern", "Manager", "Employee", "Don't add"]
            }

        ])
        .then(function ({ choice }) {
            if (choice === "Intern") {
                internQuestions()
            }
            else if (choice === "Manager") {
                managerQuestions()
            }
            else if (choice === "Employee") {
                employeeQuestions()
            }
            else if (choice === "Engineer") {
                engineerQuestions()
            }
            else if (choice === "Don't add") {
                render()
            }
        })
}
function employeeQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's name.",
                name: "name",
                validate: function validateName(name) {
                    return name !== '';
                }
            },
            {
                type: "input",
                message: "Enter the employee's id number.",
                name: "id",
                validate: function validateAge(id) {
                    var reg = /^\d+$/;
                    return reg.test(id) || "Id should be a number.";
                }
            },
            {
                type: "input",
                message: "Enter the employee's email.",
                name: "email",
                validate: function ValidateEmail(email) {
                    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return reg.test(email) || "You have entered an invalid email address!"

                }
            }
        ])
        .then(function ({ name, id, email, officeNumber }) {
            new Employee(name, id, email, officeNumber)
            selectMember()
        })
}
function managerQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the manager's name.",
                name: "name",
                validate: function validateName(name) {
                    return name !== '';
                }
            },
            {
                type: "input",
                message: "Enter the manager's id number.",
                name: "id",
                validate: function validateAge(id) {
                    var reg = /^\d+$/;
                    return reg.test(id) || "Id should be a number.";
                }
            },
            {
                type: "input",
                message: "Enter the manager's email.",
                name: "email",
                validate: function ValidateEmail(email) {
                    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return reg.test(email) || "You have entered an invalid email address!"

                }
            },
            {
                type: "input",
                message: "Enter the manager's office number.",
                name: "officeNumber",
                validate: function validateAge(officeNumber) {
                    var reg = /^\d+$/;
                    return reg.test(officeNumber) || "Office Number should be a number.";
                }
            }
        ])
        .then(function ({ name, id, email, officeNumber }) {
            new Manager(name, id, email, officeNumber)
            selectMember()
        })
}
function engineerQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the engineer's name.",
                name: "name",
                validate: function validateName(name) {
                    return name !== '';
                }
            },
            {
                type: "input",
                message: "Enter the engineer's id number.",
                name: "id",
                validate: function validateAge(id) {
                    var reg = /^\d+$/;
                    return reg.test(id) || "Id should be a number.";
                }
            },
            {
                type: "input",
                message: "Enter the engineers's email.",
                name: "email",
                validate: function ValidateEmail(email) {
                    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return reg.test(email) || "You have entered an invalid email address!"

                }
            },
            {
                type: "input",
                message: "Enter the engineer's github.",
                name: "github",
                validate: function validateGithub(github) {
                    return github !== '';
                }
            }
        ])
        .then(function ({ name, id, email, github }) {
            new Engineer(name, id, email, github)
            selectMember()
        })
}
function internQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the intern's name.",
                name: "name",
                validate: function validateName(name) {
                    return name !== '';
                }
            },
            {
                type: "input",
                message: "Enter the intern's id number.",
                name: "id",
                validate: function validateAge(id) {
                    var reg = /^\d+$/;
                    return reg.test(id) || "Id should be a number.";
                }
            },
            {
                type: "input",
                message: "Enter the intern's email.",
                name: "email",
                validate: function ValidateEmail(email) {
                    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return reg.test(email) || "You have entered an invalid email address!"

                }
            },
            {
                type: "input",
                message: "Enter the intern's school.",
                name: "school",
                validate: function validateSchool(name) {
                    return name !== '';
                }
            }
        ])
        .then(function ({name, id, email, school}) {
            new Intern(name, id, email, school)
            selectMember()
        })
}
function init() {
    selectMember()
}

init();

