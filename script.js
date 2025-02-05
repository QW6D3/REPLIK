fetch('podcasts.json')
  .then(response => response.json())
  .then(podcasts => {
    const podcastGrid = document.getElementById('podcastGrid');

    if (podcasts.podcasts.length > 0) {
      const latestPodcast = podcasts.podcasts[0];
      const lastReleaseDesc = document.getElementById('descContent');
      const lastReleaseImage = document.querySelector('.profilImage');
      
      lastReleaseDesc.textContent = latestPodcast.description || "Description indisponible";
      lastReleaseImage.src = latestPodcast.image;

      const podcastUrl = `/podcasts/${latestPodcast.id}`;
      playLink.href = podcastUrl;
    }

    podcasts.podcasts.forEach(podcast => {
      const link = document.createElement('a');
      link.href = `/podcasts/${podcast.id}`;

      const img = document.createElement('img');
      img.src = podcast.image;
      img.alt = `Illustration de ${podcast.title}`;
      img.width = 200;
      img.height = 200;
      img.style.objectFit = "cover";
      img.style.borderRadius = "10px";
      img.href = `/podcasts/${podcast.id}`;

      link.appendChild(img);
  
      podcastGrid.appendChild(link);
    });
  })
  .catch(error => console.error("Erreur de chargement du fichier JSON :", error));
