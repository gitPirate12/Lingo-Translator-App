const router = require("express").Router();
const Emoji = require("../models/Emoji");









// Route to search emoji by entering emoji
router.route("/search/:emoji").get(async (request, response) => {
    const enteredEmoji = request.params.emoji;

    try {
        const emoji = await Emoji.findOne({ emoji: enteredEmoji });
        if (emoji) {
            response.json({ status: "Emoji found", meaningEng: emoji.meaningEng, meaningSin: emoji.meaningSin });
        } else {
            response.status(404).json({ status: "Emoji not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error searching emoji", error: error.message });
    }
});

module.exports = router;