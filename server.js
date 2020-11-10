const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./server/models/person");

// 1

mongoose.connect(process.env.MONGODB_URL, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log(chalk.green("Database connected"));
});

// 2

app.get("/add", (req, res, next) => {
  const person1 = new Person({
    name: Saitama,
    age: 27,
    favoriteFoods: ["ramen", "pizza", "sushi"],
  });
});

// 3

app.get("manyAdd", (req, res, next) => {
  Person.create([
    {
      name: Lucy,
      age: 32,
      favoriteFoods: ["salade", "buger", "steak"],
    },
    {
      name: Julia,
      age: 24,
      favoriteFoods: ["salade", "chicken", "pizza"],
    },
    {
      name: Midoriya,
      age: 27,
      favoriteFoods: ["burger", "chicken", "rice"],
    },
  ]);
});

// 4

app.get("/search", (req, res, next) => {
  Person.find({ name: name })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});

// 5

app.get("/findOne", (req, res, next) => {
  Person.findOne({ favoriteFoods: { $in: ["chicken", "pizza"] } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});

// 6

app.get("/findById", (res, req, next) => {
  Person.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", doc);
    }
  });
});

// 7

app.get("/update", (req, res, next) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.log("error while searching", err);
    } else {
      personFound.favoriteFoods.push("couscous");
      personFound
        .save()
        .then((response) => {
          console.log("person saved successfully", personFound);
        })
        .catch((err) => console.log("error occured while saving", err));
    }
  });
});

// 8

app.get("/findOneAndUpdate", (req, res, next) => {
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

// 9

app.get("/findByIdAndRemove", (req, res, next) => {
  Person.findByIdAndRemove(personId2, (err, deletedPerson) => {
    err
      ? console.log("error occured while deleting")
      : console.log("this object is deleted with succes", deletedPerson);
  });
});

// 10

app.get("/LikeSushi", (req, res, next) => {
  Person.find({ favoriteFoods: { $in: "sushi" } })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err
        ? console.log("error while looking for people who like suhi", err)
        : console.log("people who like sushi", data);
    });
});

// 11

app.get("/deleteAllLucy", (req, res, next) => {
  Person.remove({ name: "Lucy" }, (err, result) => {
    err
      ? console.log("error while deleting")
      : console.log("deleted successfully", result);
  });
});
