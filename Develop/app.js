const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve("output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employeeArray = [];

function selectMember() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select team member to add.",
                name: "choice",
                choices: ["Engineer", "Intern", "Manager", "Finish"]
            }

        ])
        .then(function ({ choice }) {
            if (choice === "Intern") {
                newIntern()
            }
            else if (choice === "Manager") {
                newManager()
            }
            else if (choice === "Engineer") {
                newEngineer()
            }
            else if (choice === "Finish") {
                printFile()
            }
        })
}

function newManager() {
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
        .then(response => {
            const newManager = new Manager(response.name, response.id, response.email, response.school);
    
            employeeArray.push(newManager);
    
            selectMember();
        });
}
function newEngineer() {
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
        .then(response => {
            const newEngineer = new Engineer(response.name, response.id, response.email, response.school);
    
            employeeArray.push(newEngineer);
    
            selectMember();
        });
}
function newIntern() {
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
        .then(response => {
            const newIntern = new Intern(response.name, response.id, response.email, response.school);
    
            employeeArray.push(newIntern);
    
            selectMember();
        });
}

const printFile = () => {
    const thisNewTeam = render(employeeArray);

    fs.writeFile(outputPath, thisNewTeam, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Success! Your team.html file is in your output folder.");
        }
    });
}

function init() {
    selectMember()
}

init();

