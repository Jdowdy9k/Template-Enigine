const path = require("path");
const fs = require("fs");
const templatesDir = "./templates/";

const render = employees => {
  const html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(Manager => renderManager(Manager)).join("")
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer)).join("")
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern)).join("")
  );

  return renderMain(html.join(""));

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

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
