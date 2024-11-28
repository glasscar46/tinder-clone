const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const PORT = 5000;
const app = express();

const uri =
  "mongo_uri";

const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Hello world");
});
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const { email, password } = req.body;
  const generatedUserid = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const db = client.db("app-data");
    const userCollection = db.collection("Users");
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists. Please Login");
    }
    const formattedemail = email.toLowerCase();
    const insertedUser = await userCollection.insertOne({
      email: formattedemail,
      user_id: generatedUserid,
      hashed_password: hashedPassword,
    });
    const token = jwt.sign(insertedUser, email, { expiresIn: 60 * 15 }); //could use key
    return res.status(201).json({ token, user_id: generatedUserid });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);

  const { email, password } = req.body;
  try {
    await client.connect();
    console.log(email, password);
    const database = client.db("app-data");
    const userCollection = database.collection("Users");
    const user = await userCollection.findOne({ email });
    if (user && (await bcrypt.compare(password, user.hashed_password))) {
      let token = jwt.sign(user, email, { expiresIn: 60 * 15 });
    return res.status(201).json({ token, user_id: user.user_id });
    }
    res.status(400).send("Invalid login credentials");
  } catch (err) {
    console.log(err);
  }
  finally{
    client.close()
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body;
  try {
    await client.connect();
    const db = client.db("app-data");
    console.log(req.body);
    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        matches: formData.matches,
        about: formData.about,
      },
    };
    const inserted_user = await db
      .collection("Users")
      .findOneAndUpdate(query, updateDocument);
    res.status(200).json(inserted_user);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const user_id = req.query.userId;

  try {
    await client.connect();
    const user = await client
      .db("app-data")
      .collection("Users")
      .findOne({ user_id });
      res.status(200).send(user)
  } catch (error) {
    console.log(error)
  }
  finally{
    await client.close()
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("app-data");
    const userCollection = db.collection("Users");
    const users = await userCollection.find().toArray();
    res.send(users);
  } finally {
    client.close();
  }
});

app.listen(PORT, () => console.log("server is running on port 5000"));
