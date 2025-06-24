const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    const project = await Project.create({
      title: 'Test Project',
      description: 'Project for testing',
      owner: user._id,
    });

    const task = await Task.create({
      title: 'First Task',
      description: 'A simple test task',
      status: 'todo',
      project: project._id,
      assignedTo: user._id,
    });

    console.log('User:', user);
    console.log('Project:', project);
    console.log('Task:', task);

    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));
