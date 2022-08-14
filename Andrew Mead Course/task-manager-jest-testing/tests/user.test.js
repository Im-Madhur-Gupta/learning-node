const app = require("../src/app");
const request = require("supertest");

const User = require("../src/models/User");

const { setupDatabase, tempUser } = require("./fixtures/db");

// Will run before each test case
beforeEach(setupDatabase);

// Will run after each test case
// afterEach(() => {
//   console.log("afterEach");
// });

test("should sign up a user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      email: "jay@gmail.com",
      password: "1234567890",
      name: "Jay Gupta",
      age: 19,
    })
    .expect(201);

  // Assert whether the user was created or not
  const user = await User.findById(response.body.user._id);
  // expecting this user object to be not null
  expect(user).not.toBeNull();

  // Assertion about the response (asserting something about an object)
  // response.body mai given object ka hona zaroori he, isse zyada ppts hui to np, but itna to hona hi chahiye.
  expect(response.body).toMatchObject({
    user: {
      email: "jay@gmail.com",
      name: "Jay Gupta",
    },
    token: user.tokens[0].token,
  });

  // Asserting that the password stored in the db is not in plain text
  expect(user.password).not.toBe("1234567890");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: tempUser.email,
      password: tempUser.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);

  // Assert that the new token is saved
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "doesntexist@gmail.com",
      password: "doesntexistpassword",
    })
    .expect(400);
});

test("should get profile for authenticated user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete authenticated user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(response.body.user._id);
  // Asserting that the user was deleted
  expect(user).toBeNull();
});

test("should not delete unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  // inorder to attach a file to a request we use the attach() method of the supertest package.
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  // Assert whether binary image data stored on the DB is a Buffer object or not
  const user = await User.findById(tempUser._id);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send({ name: "Temp new" })
    .expect(200);

  // Asserting that the new name is stored in the DB
  const user = await User.findById(tempUser._id);
  expect(user.name).toBe("Temp new");
});

test("should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${tempUser.tokens[0].token}`)
    .send({ location: "Minicoy Island" })
    .expect(200);

  // Asserting that the new data is not stored in the DB
  const user = await User.findById(tempUser._id);
  expect(user.location).toEqual(undefined);
});
