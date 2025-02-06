import mongoose from "mongoose";

const { Schema } = mongoose;

await mongoose.connect("mongodb://root:admin@mongodb:27017", {
    authSource: "admin"
});

const podcastSchema = new Schema({
    _id: String,
    title: String,
    description: String,
    content: String,
    date: Date,
    audioId: mongoose.Types.ObjectId,
    coverId: mongoose.Types.ObjectId,
    audioUrl: String,
    coverUrl: String,
    image: String,
    length: Number,
    size: Number,
    peaks: [Number],
    authors: [{ name: String }]
});

const Podcast = mongoose.model("Podcast", podcastSchema);

const imageBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images'
});

const audioBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'audio'
});

export const getPodcastById = async (id) => {
    try {
        const podcast = await Podcast.findById(id).exec();
        return podcast;
    } catch (error) {
        console.error("Error fetching podcast by ID", error);
        return { error: "Error fetching podcast by ID", details: error.message };
    }
};

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

export const uploadPodcastMeta = async (podcastMeta) => {
    try {
        const podcast = new Podcast(podcastMeta);
        await podcast.save();
        return podcast;
    } catch (error) {
        console.error("Error uploading podcast", error);
        return { error: "Error uploading podcast", details: error.message };
    }
};

export const uploadPodcastCover = async (fileBuffer, fileName) => {
    const uploadStream = imageBucket.openUploadStream(fileName);

    uploadStream.end(fileBuffer, () => {
        console.log("File uploaded");
    });

    return uploadStream.id;
}

export const uploadPodcastAudio = async (fileBuffer, fileName) => {
    const uploadStream = audioBucket.openUploadStream(fileName);

    uploadStream.end(fileBuffer, () => {
        console.log("File uploaded");
    });

    return uploadStream.id;
};

export const getCoverFromTitle = (title) => {
    return imageBucket.openDownloadStream({ title: title });
}

export const getCoverFromId = (id) => {
    return imageBucket.openDownloadStream(id);
}

export const getAudioStreamFromId = (id) => {
    return audioBucket.openDownloadStream(id);
}

export default {
    getPodcastById,
    getPodcastByTitle,
    getPodcastsMeta,
    uploadPodcastMeta,
    uploadPodcastAudio,
    getAudioStreamFromId,
    uploadPodcastCover,
    getCoverFromId,
    getCoverFromTitle,
};
