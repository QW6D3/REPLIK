export interface Podcast {
  title: string; // Podcast name
  description: string; // Brief overview of the podcast
  link: string; // URL of the main website
  language: string; // Podcast language (e.g., 'fr', 'en')
  copyright: string; // Copyright text
  author: string; // Name of the author/creator
  feedUrl: string; // URL to the RSS feed
  image: string; // URL to the podcast cover image
  episodes: Episode[]; // Array of episodes
}

export interface Episode {
  title: string; // Episode title
  description: string; // Description for the episode
  url: string; // URL of the audio file
  length: number; // Size of the audio file in bytes
  type: string; // MIME type of the audio file (e.g., 'audio/mpeg')
  pubDate: string; // Publish date as ISO string
  duration: number; // Duration in seconds
  explicit: boolean; // Whether the episode has explicit content
  episode: number; // Episode number
  season: number; // Season number
  episodeType: "full" | "trailer" | "bonus"; // Type of episode
  image?: string; // Optional episode-specific artwork
}

export const podcast: Podcast = {
  title: "Replik Podcast",
  description: "Un podcast autour de la pop culture et du cinéma.",
  link: "https://decouvrir-mmi.univ-lemans.fr/replik_podcast",
  language: "fr",
  copyright: "Copyright © 2024, Antoine Ferron",
  author: "Antoine Ferron",
  feedUrl: "https://example.com/rss",
  image: "https://example.com/replik_podcast_cover.png",
  episodes: [
    {
      title: "Épisode 1 : Les grands classiques du cinéma",
      description: "Un voyage au cœur des chefs-d'œuvre du 7ème art.",
      url: "https://example.com/episode1.mp3",
      length: 12345678,
      type: "audio/mpeg",
      pubDate: "2024-12-18T10:00:00Z",
      duration: 3600,
      explicit: false,
      episode: 1,
      season: 1,
      episodeType: "full",
      image: "https://example.com/episode1_image.png",
    },
    {
      title: "Épisode 2 : Le cinéma d’animation",
      description: "Les œuvres incontournables du genre.",
      url: "https://example.com/episode2.mp3",
      length: 98765432,
      type: "audio/mpeg",
      pubDate: "2024-12-25T10:00:00Z",
      duration: 4800,
      explicit: true,
      episode: 2,
      season: 1,
      episodeType: "full",
    },
  ],
};
