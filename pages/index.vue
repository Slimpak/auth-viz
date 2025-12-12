<template>
  <div class="home-page">
    <div class="container">
      <header class="header">
        <h1 class="title">CampOrganizer Auth v2</h1>
        <p class="subtitle">Interactive Architecture Documentation</p>
      </header>

      <div class="content">
        <div class="description">
          <h2>About This Project</h2>
          <p>
            Comprehensive visual documentation of CampOrganizer's Authentication v2 architecture.
            Explore 6 interactive scenarios showing token flow, storage mechanisms, and security patterns.
          </p>
        </div>

        <div class="features">
          <div class="feature-card">
            <div class="icon">🔐</div>
            <h3>Dual Token System</h3>
            <p>Access Token (client) + Refresh Token (server-only HttpOnly)</p>
          </div>

          <div class="feature-card">
            <div class="icon">⚡</div>
            <h3>Smart Request Logic</h3>
            <p>TTL checks, preventive refresh, and queue mechanisms</p>
          </div>

          <div class="feature-card">
            <div class="icon">🔄</div>
            <h3>SSR Token Handling</h3>
            <p>Automatic server-side token validation and refresh</p>
          </div>

          <div class="feature-card">
            <div class="icon">🛡️</div>
            <h3>Host Isolation</h3>
            <p>Secure cookie separation between applications</p>
          </div>

          <div class="feature-card">
            <div class="icon">👁️</div>
            <h3>Tab Focus Refresh</h3>
            <p>Auto-refresh on visibilitychange events</p>
          </div>

          <div class="feature-card">
            <div class="icon">🚦</div>
            <h3>Race Condition Handling</h3>
            <p>Single refresh lock for parallel 401 responses</p>
          </div>
        </div>

        <NuxtLink to="/auth-viz" class="cta-button">
          Explore Interactive Visualization →
        </NuxtLink>
      </div>

      <footer class="footer">
        <p>Built with Nuxt 4 + Vue Flow | CampOrganizer 2025</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'CampOrganizer Auth v2 - Architecture Documentation',
  meta: [
    { name: 'description', content: 'Interactive visual documentation of CampOrganizer Authentication v2 architecture with 6 detailed scenarios.' }
  ]
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  color: white;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  font-size: 1.125rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 2rem;
  color: white;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  text-align: left;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

.footer {
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.footer a {
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #667eea;
}

@media (max-width: 640px) {
  .card {
    padding: 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
