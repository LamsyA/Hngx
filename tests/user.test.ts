import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index';
import User, { IUser } from '../models/users'; 

chai.use(chaiHttp);

const expect = chai.expect;

let mongod: MongoMemoryServer;
let UserModel: mongoose.Model<IUser>;

describe('User API Endpoints', () => {
  before(async () => {

    mongod = await MongoMemoryServer.create();
    const uri: string = await mongod.getUri();

    await mongoose.createConnection(uri);

    UserModel = User;
  });

  after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    // Create a sample user before each test
    const user = new UserModel({
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
    });
    await user.save();
  });

  afterEach(async () => {
    // Clean up the database after each test
    await UserModel.deleteMany({});
  });

  it('should create a new user', async () => {
    const res = await chai
      .request(app)
      .post('/api')
      .send({
        name: 'New User',
        email: 'newuser@example.com',
        age: 30,
      });
  
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal('success');
      expect(res.body.user).to.deep.include({
        name: 'New User',
        email: 'newuser@example.com',
        age: 30,
      });
      
  })

  it('should get a user by name', async () => {
    const res = await chai.request(app).get('/api/Test%20User'); 

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.user).to.deep.include({
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
    });
  });

  it('should update a user by name', async () => {
    const res = await chai
      .request(app)
      .put('/api/Test%20User')
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        age: 35,
      });

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.user).to.deep.include({
        name: 'Updated User',
        email: 'updated@example.com',
        age: 35,
      });
      
  });

  it('should delete a user by name', async () => {
    const res = await chai.request(app).delete('/api/Test%20User');

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.equal('user successfully deleted');

  });
});
