import mongoose from "mongoose";

const { Schema } = mongoose;

await mongoose.connect("mongodb://root:admin@mongodb:27017", {
    authSource: "admin"
});

const podcastSchema = new Schema({
    title: String,
    id: String,
    link: String,
    description: String,
    content: String,
    date: Date,
    audioUrl: String,
    image: String,
    length: Number,
    size: Number,
    peaks: [Number],
    authors: [{ name: String }]
});

const Podcast = mongoose.model("Podcast", podcastSchema);

export const getPodcastByTitle = async (title) => {
    try {
        const podcast = await Podcast.findOne({ title }).exec();
        return podcast;
    } catch (error) {
        console.error("Error fetching podcast by title", error);
        return { error: "Error fetching podcast by title", details: error.message };
    }
};

export const getPodcastsMeta = async () => {
    try {
        const podcastsMeta = await Podcast.find({}, { peaks: 0, authors: 0 }).exec();
        return podcastsMeta;
    } catch (error) {
        console.error("Error fetching podcasts metadata", error);
        return { error: "Error fetching podcasts metadata", details: error.message };
    }
};

/**
 * 
 * @param {Object} podcastMeta 
 * @returns 
 */
export const uploadPodcastMeta = async (podcastMeta) => {
    try {
        const podcast = new Podcast(podcastMeta);
        await podcast.save();
    } catch (error) {
        console.error("Error uploading podcast", error);
        return { error: "Error uploading podcast", details: error.message };
    }
};

export const uploadPodcastAudio = async (fileBuffer, fileName) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    const uploadStream = bucket.openUploadStream(fileName);

    //Utilisation de end envoyer uniquement le buffer et ensuite fermer le stream
    uploadStream.end(fileBuffer, () => {
        console.log("File uploaded");
    });

    return uploadStream.id;
};

export const getAudioStreamFromId = (id) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    return bucket.openDownloadStream(mongoose.Types.ObjectId.createFromHexString(id));
}

export default {
    getPodcastByTitle,
    getPodcastsMeta,
    uploadPodcastMeta,
    uploadPodcastAudio,
    getAudioStreamFromId,
};
