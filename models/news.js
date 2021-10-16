const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avis: [
        {
            reaction: {
                type: String,
                enum: ['aimer', 'detester']
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                unique: true
            }
        }
    ],
    commentaire: [
        {   
            description: {
                type: String,
            },
            userId: {
                type: String,
            },
            avis: [
                {
                reaction: {
                    type: String,
                    enum: ['aimer', 'detester']
                },
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    unique: true
                }
                }
            ],
            createdAt: {
                type: Schema.Types.Date,
                default: new Date,
                required: true
            },
        }
    ],
    imgUrl: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date,
        required: true
    },
});
let News;
if (mongoose.models.News) {
    News = mongoose.model('News');
  } else {
    News = mongoose.model('News', newsSchema);
  }
// module.exports = mongoose.model('News', newsSchema);
module.exports = News;