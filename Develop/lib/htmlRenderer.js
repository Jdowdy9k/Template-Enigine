const path = require("path");
const fs = require("fs");
const employees = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const templatesDir = "./templates/";

const render = employees => {
  const html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(Manager => renderManager(Manager))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return render(html.join(""));

};

const renderManager = Manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", Manager.getName());
  template = replacePlaceholders(template, "role", Manager.getRole());
  template = replacePlaceholders(template, "email", Manager.getEmail());
  template = replacePlaceholders(template, "id", Manager.getId());
  template = replacePlaceholders(template, "officeNumber", Manager.getOfficeNumber());
  return template;
};

const renderEngineer = Engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", Engineer.getName());
  template = replacePlaceholders(template, "role", Engineer.getRole());
  template = replacePlaceholders(template, "email", Engineer.getEmail());
  template = replacePlaceholders(template, "id", Engineer.getId());
  template = replacePlaceholders(template, "github", Engineer.getGithub());
  return template;
};

const renderIntern = Intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", Intern.getName());
  template = replacePlaceholders(template, "role", Intern.getRole());
  template = replacePlaceholders(template, "email", Intern.getEmail());
  template = replacePlaceholders(template, "id", Intern.getId());
  template = replacePlaceholders(template, "school", Intern.getSchool());
  return template;
};

function createManager(name, id, email, officeNumber){
  const manager = new Manager(name, id, email, officeNumber)
  renderManager(manager)
}

function createEngineer(name, id, email, github){
  const engineer = new Engineer(name, id, email, github)
  renderEngineer(engineer)
}

function createIntern(name, id, email, school){
  const intern = new Intern(name, id, email, school)
  renderIntern(intern)
}

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports ={
  createManager: createManager,
  createEngineer: createEngineer,
  createIntern: createIntern,
  renderMain: renderMain
};
