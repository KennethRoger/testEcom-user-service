const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

// Mocked generateToken for testing
jest.mock("../src/utils/generateToken", () => (
 jest.fn().mockResolvedValue("fake-jwt-token")
));

const app = require("../src/app"); 

let mongoServer;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe("User register and login integration", () => {
  const user = {
    name: "user",
    email: "user@test.com",
    password: "pass123",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("token", "fake-jwt-token");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user.email).toBe(user.email);
  });

  it("should login with registered user", async () => {
    const res = await request(app).post("/users/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("token", "fake-jwt-token");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user.email).toBe(user.email);
  });
});
