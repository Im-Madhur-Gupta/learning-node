const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/User");
const { sendWelcomeEmail, sendGoodbyeEmail } = require("../emails/account");

const router = new express.Router();

// sign up
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    // using a custom function that I'll define in the USER SCHEMA
    // Such a method is called Model method.
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Logged out from current device.");
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logged out from all devices.");
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);

  // BELOW METHOD DOESNT RUN THE PASSWORD HASHING MIDDLEWARE
  // yaha pe jo update object he usmai agr koi aisi field he jo us model (schema) mai ni he to wo field ni add hogi DB ke us document mai.
  // User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  //   .then((user) => res.send(user))
  //   .catch((err) => res.status(404).send(err));

  // SO WE CHANGE IT
  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // user instance pai jaise save() method he waise hi remove() method bhi he.
    await req.user.remove();
    sendGoodbyeEmail(req.user.email, req.user.name);
    res.send({ user: req.user });
  } catch (e) {
    res.status(400).send(e);
  }
});

const upload = multer({
  // IMPORTANT - If we comment out dest:"___" then Multer wont save the file on the file system rather
  // it would just save the file on the req object under the key name "file" (for single file).
  // dest: "avatars",

  limits: {
    fileSize: 1000000, // to provide an upper limit to file size (in bytes) that can be uploaded.
  },
  // file pe certain filter apply karne ke liye we use "fileFilter".
  fileFilter(req, file, cb) {
    // req -> request being made
    // file -> file being uploaded
    // cb -> to be called when we are done with the body of the fileFilter function
    // ways in which cb can be called - cb(err, shouldFileUpload);
    // 1. cb(undefined, true) -> no error occured and proceed with the upload.
    // 2. cb(undefined, false) -> no error occured and but dont proceed with the upload.
    // 3. cb(new Error("___")) -> some error occured

    // I am only accepting jpg image files here.
    // file.originalname -> gives the name of the file on the user's computer
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Only jpg, jpeg and png files are allowed"));
    }

    cb(undefined, true); // accepting the file
  },
});

// Add/Update avatar
// WITHOUT SHARP
// router.post(
//   "/users/me/avatar",
//   auth,
//   upload.single("avatar"),
//   async (req, res) => {
//     // as I have commented out dest:"___" then the file data will be stored under req.file
//     req.user.avatar = req.file.buffer;
//     await req.user.save();
//     res.send();
//   },
//   // IMPORTANT -
//   // Below function runs when an error is encountered, ie express calls it when an error occurs in the other middlewares.
//   (err, req, res, next) => {
//     res.status(400).send({ Error: err.message });
//   }
// );

// WITH SHARP
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // using sharp to resize the image and converting it to png
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  // IMPORTANT -
  // Below function runs when an error is encountered, ie express calls it when an error occurs in the other middlewares.
  (err, req, res, next) => {
    res.status(400).send({ Error: err.message });
  }
);

// Delete avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  // removing the avatar of the authenticated user
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Get avatar
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const userId = req.params.id.trim();
    console.log(userId);
    const user = await User.findById(userId);

    if (!user || !user.avatar) {
      throw new Error();
    }

    // telling the user which type of data they are getting by specifing content-type on response object
    // rn its image/jpg
    console.log("here");
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
