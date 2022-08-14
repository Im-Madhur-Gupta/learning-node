const app = require("../src/app");
const request = require("supertest");

const Task = require("../src/models/Task");

const { setupDatabase, tempUser, tempTask1 } = require("./fixtures/db");

// Will run before each test case
beforeEach(setupDatabase);

test("should create a task for a user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send({
      description: "Temp task",
      isCompleted: true,
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).toMatchObject({ description: "Temp task", isCompleted: true });
});

test("should get all tasks for a user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
});

test("should not be able to delete tasks of another user", async () => {
  const response = await request(app)
    .delete(`/tasks/${tempTask1._id}`)
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send()
    .expect(404);

  const task = Task.findById(tempTask1._id);
  expect(task).not.toBeNull();
});
