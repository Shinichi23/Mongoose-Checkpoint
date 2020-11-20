const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/person");
require("dotenv").config();

app.get("/add", (req, res) => {
  const person1 = new Person({
    name: "lucy",
    age: 24,
    favoriteFoods: ["pizza", "salad", "lasagna"],
  });

  person1.save((err) => {
    err
      ? console.log("error while saving", err)
      : console.log("saved successfully");
  });
});

app.get("/add_many", (req, res) => {
  Person.create([
    {
      name: "John",
      age: 14,
      favoriteFoods: ["couscous", "fruits", "lasagna", "poisson"],
    },
    { name: "Karim", age: 28, favoriteFoods: ["pizza", "salad"] },
    { name: "Saitama", age: 18, favoriteFoods: ["chicken wings"] },
    { name: "Kim", age: 35, favoriteFoods: ["pizza", "spaghetti", "riz"] },
  ]);
});

let name = "Karim";
app.get("/search", (req, res) => {
  Person.find({ name: name })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});

app.get("/findOne", (req, res) => {
  Person.findOne({ favoriteFoods: { $in: ["chicken wings", "spaghetti"] } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});

let id = "5f7fd6f9ae24612cece2466a";
app.get("/findById", (req, res) => {
  Person.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", doc);
    }
  });
});

const personId = "5f7fd6f9ae24612cece2466a";
app.get("/update", (req, res) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.log("error while searching", err);
    } else {
      personFound.favoriteFoods.push("burrito");
      personFound
        .save()
        .then((response) => {
          console.log("person saved successfully", personFound);
        })
        .catch((err) => console.log("error occured while saving", err));
    }
  });
});

const personName = "Saitama";
app.get("/findOneAndUpdate", (req, res) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, personUpdated) => {
      err
        ? console.log("error while updating", err)
        : console.log("the new updated person :", personUpdated);
    }
  );
});

const personId2 = "5f7fd6f9ae24612cece24669";
app.get("/findByIdAndRemove", (req, res) => {
  Person.findByIdAndRemove(personId2, (err, deletedPerson) => {
    err
      ? console.log("error occured while deleting")
      : console.log("this object is deleted with succes", deletedPerson);
  });
});

app.get("/LikeBurrito", (req, res) => {
  Person.find({ favoriteFoods: { $in: "burrito" } })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err
        ? console.log("error while looking for people who like burrito", err)
        : console.log("people who like burrito", data);
    });
});

app.get("/deleteAllMary", (req, res) => {
  Person.remove({ name: "Mary" }, (err, result) => {
    err
      ? console.log("error while deleting")
      : console.log("deleted successfully", result);
  });
});

const dbURI = process.env.MONGODB_URL;
mongoose
  .connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    { useFindAndModify: false }
  )
  .then((response) => {
    const PORT = process.env.PORT;
    app.listen(PORT, (err) => {
      err
        ? console.log("server not running", err)
        : console.log("server running successfully");
    });
  })
  .catch((err) => {
    console.log("connection to database failed", err);
  });
