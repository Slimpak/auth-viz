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
import { useHead } from '#app'

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
  color: #cbd5e1;
  padding: 2rem;
  margin: 0;
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #94a3b8;
}

.content {
  margin-bottom: 4rem;
}

.description {
  text-align: center;
  margin-bottom: 3rem;
}

.description h2 {
  font-size: 1.875rem;
  color: #e2e8f0;
  margin-bottom: 1rem;
  font-weight: 600;
}

.description p {
  font-size: 1.0625rem;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  border-color: #475569;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
}

.feature-card .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: #e2e8f0;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.feature-card p {
  color: #cbd5e1;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.0625rem;
  font-weight: 600;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 4rem;
}

.cta-button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.4);
}

.footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #334155;
  color: #64748b;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .description h2 {
    font-size: 1.5rem;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cta-button {
    display: block;
    text-align: center;
  }
}
</style>
