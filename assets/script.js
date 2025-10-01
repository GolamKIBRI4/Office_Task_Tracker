class TaskTracker {
    constructor() {
      this.apiUrl = "./api/";
      this.init();
    }
  
    init() {
      this.loadTasks();
      this.bindEvents();
    }
  
    bindEvents() {
      const taskForm = document.getElementById("taskForm");
      if (taskForm) {
        taskForm.addEventListener("submit", (e) => this.handleSubmit(e));
      }
    }
  
    async loadTasks() {
      try {
        this.showLoading();
        const ts = Date.now();
        const response = await fetch(`${this.apiUrl}?action=tasks&_=${ts}`, {
          cache: "no-store",
        });
        const result = await response.json();
  
        if (result.success) {
          this.displayTasks(result.data);
        } else {
          this.showError("Failed to load tasks");
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        this.showError("Error connecting to server");
      }
    }
  
    async handleSubmit(e) {
      e.preventDefault();
  
      const form = e.target;
      const formData = new FormData(form);
      const title = formData.get("title").trim();
      const description = formData.get("description").trim();
  
      if (!title) {
        this.showError("Task title is required");
        return;
      }
  
      try {
        const response = await fetch(`${this.apiUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "add",
            title: title,
            description: description,
          }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          this.showSuccess("Task added successfully!");
          form.reset();
          this.loadTasks();
        } else {
          this.showError(result.message || "Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
        this.showError("Error connecting to server");
      }
    }
  
    async deleteTask(taskId) {
      if (
        !confirm(
          "Are you sure you want to COMPLETE and DELETE this task? This will remove the task from the list."
        )
      ) {
        return;
      }
  
      try {
        
        const taskEl = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
        if (taskEl && taskEl.parentNode) {
          taskEl.parentNode.removeChild(taskEl);
        }
  
        const response = await fetch(`${this.apiUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "delete",
            id: taskId,
          }),
        });
  
        const raw = await response.text();
        let result;
        try {
          result = raw ? JSON.parse(raw) : { success: false, message: "Empty response" };
        } catch (e) {
          console.error("Invalid JSON response:", raw);
          this.showError("Server returned invalid response while deleting");
          return;
        }
  
        if (result.success) {
          let message = "Task completed and deleted successfully! ";
          this.showSuccess(message);
        } else {
          this.showError(result.message || "Failed to complete task");
        }
      } catch (error) {
        console.error("Error completing task:", error);
        this.showError("Error completing task");
      } finally {
        
        this.loadTasks();
      }
    }
  
    async markAsCompleted(taskId) {
      if (
        !confirm(
          "Mark this task as completed? The task will remain in the system."
        )
      ) {
        return;
      }
  
      try {
        const response = await fetch(`${this.apiUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "complete",
            id: taskId,
          }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          let message = "Task marked as completed! ";
          this.showSuccess(message);
          this.loadTasks();
        } else {
          this.showError(result.message || "Failed to mark task as completed");
        }
      } catch (error) {
        console.error("Error marking task as completed:", error);
        this.showError("Error completing task");
      }
    }
  
    
  
    displayTasks(tasks) {
      const tasksContainer = document.getElementById("tasksContainer");
  
      if (!tasks || tasks.length === 0) {
        tasksContainer.innerHTML = `
                  <div class="no-tasks">
                      <p>No pending tasks found. Add your first task above! </p>
                  </div>
              `;
        return;
      }
  
      const tasksHtml = tasks
        .map((task) => {
          const date = new Date(task.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
  
          return `
                  <div class="task-item" data-task-id="${task.id}">
                      <div class="task-content">
                          <div class="task-title">${this.escapeHtml(
                            task.title
                          )}</div>
                          ${
                            task.description
                              ? `<div class="task-description">${this.escapeHtml(
                                  task.description
                                )}</div>`
                              : ""
                          }
                          <div class="task-date">Created: ${date}</div>
                      </div>
                      <div class="task-actions">
                          <button class="btn btn-complete" onclick="taskTracker.markAsCompleted(${
                            task.id
                          })" title="Mark as completed">
                               Complete
                          </button>
                          <button class="btn btn-delete" onclick="taskTracker.deleteTask(${
                            task.id
                          })" title="Complete and delete">
                               Delete
                          </button>
                      </div>
                  </div>
              `;
        })
        .join("");
  
      tasksContainer.innerHTML = tasksHtml;
    }
  
    showLoading(message = "Loading tasks...") {
      const tasksContainer = document.getElementById("tasksContainer");
      tasksContainer.innerHTML = `<div class="loading">${message}</div>`;
    }
  
    showError(message) {
      this.showMessage(message, "error");
    }
  
    showSuccess(message) {
      this.showMessage(message, "success");
    }
  
    showMessage(message, type) {
      const existingMessage = document.querySelector(".error, .success");
      if (existingMessage) {
        existingMessage.remove();
      }
  
      const messageDiv = document.createElement("div");
      messageDiv.className = type;
      messageDiv.textContent = message;
  
      const container = document.querySelector(".container");
      const header = document.querySelector(".header");
      container.insertBefore(messageDiv, header.nextSibling);
  
      if (type === "success") {
        setTimeout(() => {
          if (messageDiv.parentNode) {
            messageDiv.remove();
          }
        }, 5000);
      }
    }
  
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    window.taskTracker = new TaskTracker();
  });
  
  function sendPhoneNotification(message) {
    console.log("Phone notification:", message);
  
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Task Tracker", {
          body: message,
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMzQ5OGRiIi8+Cjwvc3ZnPgo=",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Task Tracker", { body: message });
          }
        });
      }
    }
  }
  