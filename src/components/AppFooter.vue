<template>
  <footer class="footer-container">
    <div class="content">
      <div class="logos">
        <img src="../assets/logoInsta.png" />
        <img src="../assets/logoX.png" />
        <img src="../assets/logoTiktok.png" />
        <img src="../assets/logoYoutube.png" />
      </div>
      <nav>
        <a href="#">A Propos</a>
        <a href="#">Nos podcasts</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">Contactez-nous</a>
      </nav>
      <p>&copy; REPLIK' 2024-2025</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: transparent;
  padding: 1.5rem 0;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logos {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.footer-container p {
  margin: 0;
  font-size: 0.875rem;
  color: white;
}

.footer-container nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-container nav a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.footer-container nav a:hover {
  text-decoration: underline;
}

img {
  height: 50px;
  padding: 0.5rem;
}
</style>
