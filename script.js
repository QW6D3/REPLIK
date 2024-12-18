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
    }

    podcasts.podcasts.forEach(podcast => {
      const img = document.createElement('img');
      img.src = podcast.image;
      img.alt = `Illustration de ${podcast.title}`;
      img.width = 200;
      img.height = 200;
      img.style.objectFit = "cover";
      img.style.borderRadius = "10px";
  
      podcastGrid.appendChild(img);
    });

    // Calculer le nombre total d'épisodes et le temps total
    const totalEpisodes = podcasts.podcasts.length;
    const totalTimeInSeconds = podcasts.podcasts.reduce((sum, podcast) => {
      const durationParts = podcast.mp3_metadata.duration.split(':'); // Forme HH:MM:SS ou MM:SS
      const seconds = durationParts.reduce((acc, part, index) => {
        return acc + parseInt(part) * Math.pow(60, durationParts.length - index - 1);
      }, 0);
      return sum + seconds;
    }, 0);

    // Convertir le temps total en heures, minutes, secondes
    const totalHours = Math.floor(totalTimeInSeconds / 3600);
    const totalMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const totalSeconds = totalTimeInSeconds % 60;
    const formattedTotalTime = `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;

    // Mettre à jour le DOM avec le nombre d'épisodes et le temps total
    const nbrEpisodesElement = document.querySelector('.nbrEpisodes h3');
    const nbrTempsElement = document.querySelector('.nbrTemps h3');

    if (nbrEpisodesElement) {
      nbrEpisodesElement.textContent = totalEpisodes;
    }

    if (nbrTempsElement) {
      nbrTempsElement.textContent = formattedTotalTime;
    }
  })
  .catch(error => console.error("Erreur de chargement du fichier JSON :", error));
