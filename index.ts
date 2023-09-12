import  express  from 'express';
import cors from 'cors';
import home from './routes/home';
import api from  './routes/user'
import dotenv from "dotenv";
import bodyParser  from 'body-parser';
import logger from "morgan";
import helmet from "helmet";
import mongoose from 'mongoose';



dotenv.config();

const mongoURI = `${process.env.MONGO} `as string

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
    .then(() => {
      console.log('Connected to MongoDB');
      // Start your application server here
    })
    .catch(error => {
      console.log('Error connecting to MongoDB:', error);
      
    });

const app = express();
app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use("/home", home);
app.use("/api", api)


mongoose.connection.on('disconnected', () => {
    console.log("Disconnected from mongoDB!");
})

// Start the Express server
const port = process.env.PORT || 3004;
app.listen(port, () => {
    
    console.log(`Server is running on port ${port}`);
});

