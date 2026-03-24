const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Define a simple test schema
const TestSchema = new mongoose.Schema({
  name: String,
  value: Number
});

const TestModel = mongoose.model('Test', TestSchema);

describe('MongoDB Tests', () => {
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

  beforeEach(async () => {
    // Clear the collection before each test
    await TestModel.deleteMany({});
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