fetch('podcasts.json')
  .then(response => response.json())
  .then(podcasts => {
    const podcastGrid = document.getElementById('podcastGrid');
    
    if (podcasts.length > 0) {
      const latestPodcast = podcasts[0];
      const lastReleaseDesc = document.querySelector('.lastRelease .descPodcast p');
      const lastReleaseImage = document.querySelector('.lastRelease img');
      
      lastReleaseDesc.textContent = latestPodcast.description || "Description indisponible";
      lastReleaseImage.src = latestPodcast.image;
    }

    podcasts.forEach(podcast => {
      const img = document.createElement('img');
      img.src = podcast.image;
      img.alt = `Illustration de ${podcast.title}`;
      img.width = 200;
      img.height = 200;
      img.style.objectFit = "cover";
      img.style.borderRadius = "10px";
  
      podcastGrid.appendChild(img);
    });
  })
  .catch(error => console.error("Erreur de chargement du fichier JSON :", error));
