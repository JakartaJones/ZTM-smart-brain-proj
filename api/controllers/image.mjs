import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "459a7612199f42259c4a592d4d6f82c1",
});

const handleAPICall = (req, res) => {
  app.models
    .initModel(Clarifai.FACE_DETECT_MODEL)
    .then((faceDetectModel) => faceDetectModel.predict(req.body.input))
    // return faceDetectModel.predict(this.state.input);
    .then((data) => {
      res.json(data);
      // console.log(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("Unable to get entries");
    });
};

export { handleImage, handleAPICall };
