const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const { app, Student } = require('../index'); // Import the Express app and Student model

// Define a simple test schema for direct MongoDB tests
const TestSchema = new mongoose.Schema({
  name: String,
  value: Number
});

const TestModel = mongoose.model('Test', TestSchema);

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoURI = mongoServer.getUri();
  await mongoose.connect(mongoURI);
}, 30000); // Increase timeout for server startup

afterAll(async () => {
  // Close the connection and stop the server
  await mongoose.connection.close();
  await mongoServer.stop();
}, 30000);

describe('MongoDB Tests', () => {

  beforeEach(async () => {
    // Clear the collection before each test
    await TestModel.deleteMany({});
    await Student.deleteMany({});
  });

  test('should connect to MongoDB', async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });

  test('should create and save a document', async () => {
    const testDoc = new TestModel({ name: 'Test Item', value: 42 });
    const savedDoc = await testDoc.save();
    expect(savedDoc.name).toBe('Test Item');
    expect(savedDoc.value).toBe(42);
  });

  test('should find documents', async () => {
    await TestModel.create({ name: 'Item1', value: 1 });
    await TestModel.create({ name: 'Item2', value: 2 });

    const docs = await TestModel.find({});
    expect(docs.length).toBe(2);
  });

  test('should update a document', async () => {
    const doc = await TestModel.create({ name: 'Original', value: 10 });
    await TestModel.updateOne({ _id: doc._id }, { value: 20 });

    const updatedDoc = await TestModel.findById(doc._id);
    expect(updatedDoc.value).toBe(20);
  });

  test('should delete a document', async () => {
    const doc = await TestModel.create({ name: 'To Delete', value: 100 });
    await TestModel.deleteOne({ _id: doc._id });

    const foundDoc = await TestModel.findById(doc._id);
    expect(foundDoc).toBeNull();
  });
});

describe('API Tests', () => {
  test('GET /health - should return ok status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });

  test('POST /students - should create a new student', async () => {
    const studentData = {
      name: 'John Doe',
      age: 20,
      grade: 'A'
    };

    const response = await request(app)
      .post('/students')
      .send(studentData)
      .expect(201);

    expect(response.body.name).toBe(studentData.name);
    expect(response.body.age).toBe(studentData.age);
    expect(response.body.grade).toBe(studentData.grade);
    expect(response.body._id).toBeDefined();
  });

  test('POST /students - should return 400 for missing fields', async () => {
    const incompleteData = {
      name: 'Jane Doe'
      // missing age and grade
    };

    const response = await request(app)
      .post('/students')
      .send(incompleteData)
      .expect(400);

    expect(response.body.error).toBe('Name, age, and grade are required');
  });
});