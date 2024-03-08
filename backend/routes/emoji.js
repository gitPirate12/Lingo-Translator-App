const router = require("express").Router();
const Emoji = require("../models/Emoji"); 

// Route to add a new emoji
router.route("/add").post((request, response) => {
    const { emoji, meaningEng,meaningSin } = request.body;

    const newEmoji = new Emoji({
        emoji,
        meaningEng,
        meaningSin
    });

    newEmoji.save()
        .then(() => {
            response.json("Emoji added successfully");
        })
        .catch(error => {
            console.log(error);
            response.status(500).send({ status: "Error adding emoji", error: error.message });
        });
});




// Route to get an emoji by ID
router.route("/get/:id").get(async (request, response) => {
    const emojiId = request.params.id;

    try {
        const emoji = await Emoji.findById(emojiId);
        if (emoji) {
            response.json(emoji);
        } else {
            response.status(404).json({ status: "Emoji not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error getting emoji", error: error.message });
    }
});

module.exports = router;
