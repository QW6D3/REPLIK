const mongoose = require("mongoose");
const { createReadStream, createWriteStream } = require("fs");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017");

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

async function getPodcastByTitle(title) {
    try {
        const podcast = await Podcast.findOne({ title: title }).exec();
        return podcast;
    } catch (error) {
        console.error("Error fetching podcast by title", error);
        return { error: "Error fetching podcast by title", details: error.message };
    }
}

async function getPodcastsMeta() {
    try {
        const podcastsMeta = await Podcast.find().exec();
        return podcastsMeta;
    } catch (error) {
        console.error("Error fetching podcasts metadata", error);
        return { error: "Error fetching podcasts metadata", details: error.message };
    }
}

/**
 * 
 * @param {Object} podcastMeta 
 * @returns 
 */
async function uploadPodcastMeta(podcastMeta) {
    try {
        const podcast = new Podcast(podcastMeta);
        await podcast.save();
    } catch (error) {
        console.error("Error uploading podcast", error);
        return { error: "Error uploading podcast", details: error.message };
    }
}

async function uploadPodcastAudio(filePath, fileName) {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    const uploadStream = bucket.openUploadStream(fileName);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(uploadStream).on("finish", function () {
        console.log("File uploaded");
    });
}

async function downloadFile(fileName) {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    const downloadStream = bucket.openDownloadStreamByName(fileName);
    const fileStream = createWriteStream(fileName);
    downloadStream.pipe(fileStream).on("finish", function () {
        console.log("File downloaded");
    });
}

module.exports = { uploadPodcastMeta, uploadPodcastAudio, downloadFile, getPodcastByTitle, getPodcastsMeta };
