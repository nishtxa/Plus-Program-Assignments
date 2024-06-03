const { loadTasks, saveTasks } = require('../dataManager');

let tasks = loadTasks();
let currentId = 0;

const listTasks = (req, res) => {
    res.json(tasks);
};

const addTask = (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }
    const task = { id: ++currentId, title, description, completed: false };
    tasks.push(task);
    saveTasks(tasks)
    res.status(201).send(task);
};

const getTask = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.send(task);
};

const updateTask = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    const { title, description, completed } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    saveTasks(tasks)
    res.send(task);
};

const deleteTask = (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Task not found');
    }
    tasks.splice(index, 1);
    saveTasks(tasks)
    res.status(204).send();
};

module.exports = {
    listTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask
};
