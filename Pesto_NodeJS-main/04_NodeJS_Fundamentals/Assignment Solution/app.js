var fs = require('fs');
var greeting = require('./greetings');
const readline = require('readline');
 
let rl = readline.createInterface(
                    process.stdin, process.stdout);


rl.setPrompt("What is your name?");
rl.prompt()

rl.on('line', (name) => {
    result = greeting(name);
    fs.writeFile("output.txt", result, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
    rl.close();
});



