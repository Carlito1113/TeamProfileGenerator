const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function createManager() {
  console.log("Please Build your Team");
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your managers name?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter a name";
        },
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's id?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Enter a valid id.";
        },
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?",
        validate: (answer) => {
          if (answer != "") {
            return true;
          }
          return "Enter a valid email";
        },
      },
      {
        type: "input",
        name: "managerOffice",
        message: "What is the manager's office number?",
        validate: (answer) => {
          if (parseInt(answer) >= 0) {
            return true;
          }
          return "Enter a valid office number.";
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
}

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers.teamMember);
      if (answers.teamMember === "Engineer") {
        createEngineer();
      } else if (answers.teamMember === "Intern") {
        createIntern();
      } else {
        const renderHtml = render(teamMembers);
        fs.writeFile(outputPath, renderHtml, function (err) {
          if (err) throw err;
          console.log("Creating your team.");
        });
      }
    });
}

function createEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is your engineer's name?",
      validate: (answer) => {
        if (answer !== "") {
          return true;
        }
        return "Please enter a name";
      },
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is your engineer's id?",
      validate: (answer) => {
        if (answer !== "") {
          return true;
        }
        return "Enter a valid id.";
      },
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the engineer's email?",
      validate: (answer) => {
        if (answer != "") {
          return true;
        }
        return "Enter a valid email";
      },
    },
    {
      type: "input",
      name: "engineerGitHub",
      message: "What is your engineer's GitHub?",
      validate: (answer) => {
        if (parseInt(answer) >= 0) {
          return true;
        }
        return "Enter a valid GitHub account.";
      },
    },
  ])
  .then((answers) => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
    teamMembers.push(engineer);
    idArray.push(answers.engineerId);
    createTeam();
  });
}

function createIntern() {
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is your intern's name?",
      validate: (answer) => {
        if (answer !== "") {
          return true;
        }
        return "Please enter a name";
      },
    },
    {
      type: "input",
      name: "internId",
      message: "What is your interns's id?",
      validate: (answer) => {
        if (answer !== "") {
          return true;
        }
        return "Enter a valid id.";
      },
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is the intern's email?",
      validate: (answer) => {
        if (answer != "") {
          return true;
        }
        return "Enter a valid email";
      },
    },
    {
      type: "input",
      name: "internSchool",
      message: "What school did your intern attend?",
      validate: (answer) => {
        if (parseInt(answer) >= 0) {
          return true;
        }
        return "Enter a valid university";
      },
    },
  ])
  .then((answers) => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    teamMembers.push(intern);
    idArray.push(answers.internId);
    createTeam();
  });
}

function mainMenu() {
  createManager();
}

mainMenu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
