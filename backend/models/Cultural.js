const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CulturalSchema = new Schema({
    GalleLWord: {//last word of galle
        type: String,
        required: false
    },
    MathaleLWord: {
        type: String,
        required: false
    }
});

const Cultural = mongoose.model("Cultural", CulturalSchema);

module.exports = Cultural;