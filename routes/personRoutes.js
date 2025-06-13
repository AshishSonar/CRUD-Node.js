const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const listOfPerson = await Person.find();
    console.log("data fetched");
    res.status(200).json(listOfPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
    const userData = req.userPayload
    console.log('UserData:', userData)
    const userID = userData.id
    const user = await Person.findById(userID)
    res.status(200).json({user})

  }catch(err){
    console.log(err)
    res.status(500).json({error: 'internal server error'})
  }
})

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("person saved");

    const payload = {
      id: response.id,
      username: response.username
    }

    const token = generateToken(payload)
    console.log('Payload is:', payload)
    console.log('Token Is:', token)

    res.status(200).json({ GotResponse: response, generatedToken: token });
  } catch (error) {
    console.log("Error saving person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/login', async (req, res) => {
  try{
      const {username, password} = req.body
      const user = await Person.findOne({username: username})
      if(!user || !(await user.comparePassword(password)))
        return res.status(401).json({error: "invalid username & password"})
      const payload = {
        id: user.id,
        username: user.username
      }
      const token = generateToken(payload)
      res.json(token)
  }catch(err){
      console.log(err)
      res.status(500).json({error: 'Internal server error'})
  }
})



router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      { new: true, runValidators: true }
    );

    if (!response) {
      res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error saving person");
    res.status(500).json({ error: "person not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "person not found" });
    }
    console.log("person deleted");
    res.status(200).json({ message: "person deleted" });
  } catch {
    console.log("Error saving person");
    res.status(500).json({ error: "person not found" });
  }
});

module.exports = router;
