const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());

let jsonData = [];

fs.readFile("./Data.json", "utf-8", (err, data) => {
  if (err && jsonData) {
    console.log(err);
    jsonData = [];
  } else {
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.log("Error parsing JSON:", parseErr);
      jsonData = [];
    }
  }
});

app.get("/", (req, res) => {
  res.send(jsonData);
});

app.get("/:id", (req, res) => {
  const paramId = parseInt(req.params.id, 10);
  const item = jsonData.find((d) => d.id === paramId);
  if (item) {
    res.status(200).send(item);
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

app.post("/Addproduct", (req, res) => {
  let { id, name, category, price } = req.body;

  fs.readFile("./Data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading data");
    }

    let currentData = JSON.parse(data); // currentData stores the Data.json file
    currentData.push({ id, name, category, price }); // it pushes the user data

    fs.writeFile("Data.json", JSON.stringify(currentData, null, 2), (err) => {
      if (err) {
        console.log("Error occurred while writing to the file");
        return res.status(500).send("Error writing data");
      }
      jsonData = currentData; //jsonData stores the currentData of data
      res.send("Product successfully added");
    });
  });
});

app.put("/Put/:id", (req, res) => {
  const { id, name, category, price } = req.body;
  let paramId = parseInt(req.params.id, 10); //conver string to integer

  fs.readFile("./Data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let currentData = JSON.parse(data);
    let searchIndex = currentData.findIndex(
      (obj) => parseInt(obj.id, 10) === paramId
    );
    if (searchIndex !== -1) {
      if (id) {
        currentData[searchIndex].id = parseInt(id, 10);
      }
      if (name) {
        currentData[searchIndex].name = name;
      }
      if (category) {
        currentData[searchIndex].category = category;
      }
      if (price) {
        currentData[searchIndex].price = price;
      }
    }
    fs.writeFile("Data.json", JSON.stringify(currentData, null, 2), (err) => {
      if (err) {
        console.log("Error occurred while writing to the file");
        return res.status(500).send("Error writing data");
      }
      jsonData = currentData; //jsonData stores the currentData of data
      res.send("Product Updated successfully ");
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const parseId = parseInt(req.params.id, 10);
  console.log(`Received delete request for ID: ${parseId}`); // Add this log to check

  fs.readFile("Data.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }

    let currentData;
    try {
      currentData = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing JSON");
    }

    const searchIndex = currentData.findIndex(
      (item) => parseInt(item.id) === parseInt(parseId, 10)
    );
    const ids = currentData.map((item) => item.id);
    console.log("Available IDs in data:", ids);
    if (searchIndex !== -1) {
      currentData.splice(searchIndex, 1);
      fs.writeFile("Data.json", JSON.stringify(currentData, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Error writing data");
        }
        res.status(200).send("Item deleted successfully");
      });
    } else {
      console.log(`Item with ID ${parseId} not found`); // Log if not found
      res.status(404).send("Item not found");
    }
  });
});
app.listen(7500, () => {
  console.log("Running");
});
