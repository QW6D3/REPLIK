const { Feed } = require("feed");
const mongo = require("./mongo");

async function createRss() {
    const podcastsMeta = await mongo.getPodcastsMeta();
    const feed = new Feed({
        title: "Replik",
        description: "Replik RSS feed",
        id: "https://decouvrir-mmi.univ-lemans.fr/replik_podcast",
        link: "https://decouvrir-mmi.univ-lemans.fr/replik_podcast",
        language: "fr",
        copyright: "All rights reserved, 2024 Replik'",
        author: {
            name: "Replik",
            email: "mmipodcast2@gmail.com",
        },
    });

    feed.addCategory("Cinema");

    if (podcastsMeta.error || podcastsMeta.length < 0) {
        return feed.rss2();
    }

    podcastsMeta.forEach(podcast => {
        feed.addItem({
            title: podcast.title,
            id: podcast.id,
            link: podcast.url,
            description: podcast.description,
            copyright: "All rights reserved, 2024 Replik'",
        });
    });

    return feed.rss2();
}



module.exports = { createRss };