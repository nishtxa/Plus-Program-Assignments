const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'tasks.json');

const loadTasks = () => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

module.exports = { loadTasks, saveTasks };
