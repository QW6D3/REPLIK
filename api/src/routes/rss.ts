import { Feed } from "feed";
import { podcast } from "../models/Podcast";

const feed = new Feed({
  title: podcast.title,
  description: podcast.description,
  id: podcast.link,
  link: podcast.link,
  language: podcast.language,
  copyright: podcast.copyright,
  author: { name: podcast.author },
  image: podcast.image,
  feedLinks: {
    rss: podcast.feedUrl,
  },
});

// Add episodes to the feed
podcast.episodes.forEach((episode) => {
  feed.addItem({
    title: episode.title,
    description: episode.description,
    id: episode.url,
    link: episode.url,
    date: new Date(episode.pubDate),
    enclosure: {
      url: episode.url,
      length: episode.length,
      type: episode.type,
    },
    itunes: {
      duration: episode.duration,
      explicit: episode.explicit ? "yes" : "no",
      episode: episode.episode,
      season: episode.season,
      episodeType: episode.episodeType,
      image: episode.image,
    },
  });
});

console.log(feed.rss2());
