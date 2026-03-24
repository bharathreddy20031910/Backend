const mongoose = require('mongoose');

// Define a simple test schema
const TestSchema = new mongoose.Schema({
  name: String,
  value: Number
});

const TestModel = mongoose.model('Test', TestSchema);

describe('MongoDB Tests', () => {
  beforeAll(async () => {
    // Connect to MongoDB (use a test database)
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoURI);
  }, 10000); // Increase timeout to 10 seconds

  afterAll(async () => {
    // Close the connection
    await mongoose.connection.close();
  }, 10000);

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