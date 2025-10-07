// 代码生成时间: 2025-10-08 03:09:25
const fs = require('fs');
const path = require('path');

/**
 * TestEnvironmentManager class to manage test environments.
 * It creates, removes, and lists test environment directories.
 */
class TestEnvironmentManager {
  
  /**
   * Creates a new instance of TestEnvironmentManager.
   * @param {string} baseDir - The base directory for test environments.
   */
  constructor(baseDir) {
    this.baseDir = baseDir;
  }

  /**
   * Creates a new test environment.
   * @param {string} envName - The name of the test environment to create.
   * @returns {Promise<void>} - A promise that resolves when the environment is created.
   */
  async createEnvironment(envName) {
    try {
      const envPath = path.join(this.baseDir, envName);
      if (!fs.existsSync(envPath)) {
        await fs.promises.mkdir(envPath);
        console.log(`Test environment '${envName}' created at ${envPath}`);
      } else {
        throw new Error(`Test environment '${envName}' already exists`);
      }
    } catch (error) {
      console.error(`Error creating environment '${envName}': ${error.message}`);
      throw error;
    }
  }

  /**
   * Removes a test environment.
   * @param {string} envName - The name of the test environment to remove.
   * @returns {Promise<void>} - A promise that resolves when the environment is removed.
   */
  async removeEnvironment(envName) {
    try {
      const envPath = path.join(this.baseDir, envName);
      if (fs.existsSync(envPath)) {
        await fs.promises.rm(envPath, { recursive: true });
        console.log(`Test environment '${envName}' removed`);
      } else {
        throw new Error(`Test environment '${envName}' does not exist`);
      }
    } catch (error) {
      console.error(`Error removing environment '${envName}': ${error.message}`);
      throw error;
    }
  }

  /**
   * Lists all test environments.
   * @returns {Promise<string[]>} - A promise that resolves with an array of environment names.
   */
  async listEnvironments() {
    try {
      const envs = await fs.promises.readdir(this.baseDir);
      console.log(`Test environments: ${envs.join(', ')}`);
      return envs;
    } catch (error) {
      console.error(`Error listing environments: ${error.message}`);
      throw error;
    }
  }
}

// Usage example
const baseDir = './test_environments';
const manager = new TestEnvironmentManager(baseDir);

(async () => {
  try {
    await manager.createEnvironment('env1');
    console.log(await manager.listEnvironments());
    await manager.removeEnvironment('env1');
    console.log(await manager.listEnvironments());
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
})();