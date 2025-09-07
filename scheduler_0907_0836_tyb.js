// 代码生成时间: 2025-09-07 08:36:32
const cron = require('node-cron');

// Scheduler class to handle task scheduling
class Scheduler {
  constructor() {
    this.jobs = [];
  }

  // Schedule a new task
  addTask(schedule, task) {
    try {
      // Validate the schedule and task arguments
      if (typeof schedule !== 'string' || typeof task !== 'function') {
        throw new Error('Invalid schedule or task');
      }

      // Create a new cron job
      const job = cron.schedule(schedule, task);
      this.jobs.push(job);

      console.log(`Task scheduled to run at ${schedule}.`);
    } catch (error) {
      console.error('Failed to schedule task:', error.message);
    }
  }

  // Remove a scheduled task
  removeTask(task) {
    try {
      // Validate the task argument
      if (typeof task !== 'function') {
        throw new Error('Invalid task');
      }

      // Find and remove the cron job from the list
      const jobIndex = this.jobs.findIndex(job => job.task === task);
      if (jobIndex === -1) {
        throw new Error('Task not found');
      }

      const job = this.jobs[jobIndex];
      job.destroy();
      this.jobs.splice(jobIndex, 1);

      console.log('Task removed from schedule.');
    } catch (error) {
      console.error('Failed to remove task:', error.message);
    }
  }

  // List all scheduled tasks
  listTasks() {
    this.jobs.forEach((job, index) => {
      console.log(`Job ${index + 1}: Running at ${job.scheduledTimestamp} with schedule ${job.source}.`);
    });
  }
}

// Example usage of the Scheduler class
const scheduler = new Scheduler();

// Define a simple task function
const exampleTask = () => {
  console.log('Example task executed.');
};

// Schedule the task to run every minute
scheduler.addTask('* * * * *', exampleTask);

// List all scheduled tasks
scheduler.listTasks();

module.exports = Scheduler;