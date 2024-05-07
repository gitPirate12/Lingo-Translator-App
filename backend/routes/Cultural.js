const router = require("express").Router();
const Cultural = require("../models/Cultural");

//add words
router.route("/add").post((request, response) => {
    const { GalleLWord, MathaleLWord } = request.body;

    const newCultural = new Cultural({
        GalleLWord,
        MathaleLWord
    });

    newCultural.save()
        .then(() => {
            response.json("Cultural letter added successfully");
        })
        .catch(error => {
            console.log(error);
            response.status(500).send({ status: "Error adding emoji", error: error.message });
        });
});