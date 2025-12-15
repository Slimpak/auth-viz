<template>
  <div class="page-wrapper">
    <!-- Sidebar Menu -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>CampOrganizer<br>Auth v2</h2>
        <p class="subtitle">Architecture Visualization</p>
      </div>
      <div class="sidebar-menu">
        <button 
          v-for="(scenario, key) in scenarios" 
          :key="key"
          @click="loadScenario(key)"
          class="menu-item"
          :class="{ active: currentScenario === key }"
        >
          <div class="menu-title">{{ scenario.label }}</div>
          <div class="menu-desc">{{ scenario.short }}</div>
        </button>
      </div>
      <div class="sidebar-footer">
        <div class="legend-item">
          <div class="legend-dot green"></div> Access Token (Client)
        </div>
        <div class="legend-item">
          <div class="legend-dot blue"></div> Refresh Token (Server)
        </div>
        <NuxtLink to="/" class="home-link">← Home</NuxtLink>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="header-overlay">
        <h1>{{ scenarios[currentScenario].title }}</h1>
        <p>{{ scenarios[currentScenario].desc }}</p>
        <button @click="exportState" class="export-btn">📋 Export Layout</button>
      </div>

      <VueFlow
        v-model="elements"
        :default-viewport="{ zoom: 1.2 }"
        :min-zoom="0.2"
        :max-zoom="4"
        class="flow-canvas"
        fit-view-on-init
      >
        <Background pattern-color="#1e293b" :gap="24" />
        
        <Controls class="flow-controls" />

        <!-- Client Node with Storage -->
        <template #node-client="props">
          <div class="node-client">
            <div class="browser-bar">
              <div class="window-dots">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
              </div>
              <div class="url-bar">{{ props.data.url }}</div>
            </div>
            
            <div class="client-body">
              <div class="storage-block client-stored">
                <div class="storage-header">
                  <div class="storage-label">Access Token</div>
                  <div class="storage-badge client">Client Stored</div>
                </div>
                <div class="storage-content" v-html="props.data.access"></div>
                <div class="storage-note">💾 Can be read by JS</div>
                <Handle type="target" :position="Position.Left" id="access-in" class="handle handle-green" style="top: 50%" />
                <Handle type="source" :position="Position.Right" id="access-out" class="handle handle-green" style="top: 50%" />
              </div>

              <div class="storage-block server-stored">
                <div class="storage-header">
                  <div class="storage-label">Refresh Token</div>
                  <div class="storage-badge server">Server Only</div>
                </div>
                <div class="storage-content" v-html="props.data.refresh"></div>
                <div class="storage-note">🔒 HttpOnly (Secure)</div>
                <Handle type="target" :position="Position.Left" id="refresh-in" class="handle handle-blue" style="top: 50%" />
                <Handle type="source" :position="Position.Right" id="refresh-out" class="handle handle-blue" style="top: 50%" />
              </div>
            </div>
          </div>
        </template>

        <!-- SSR Node -->
        <template #node-ssr="props">
          <div class="node-ssr">
            <div class="ssr-title">Nuxt SSR Server</div>
            <div class="ssr-step">1. Receive Request + Cookie</div>
            <div class="ssr-step">2. Validate/Refresh Token</div>
            <div class="ssr-step">3. Render HTML</div>
            <Handle type="target" :position="Position.Left" class="handle handle-nuxt" />
            <Handle type="source" :position="Position.Right" class="handle handle-nuxt" />
          </div>
        </template>

        <!-- API Node -->
        <template #node-api="props">
          <div class="node-api">
            <div class="api-label">{{ props.label }}</div>
            <div class="api-icon">⚙️</div>
            <Handle type="target" :position="Position.Left" class="handle handle-purple" />
            <Handle type="source" :position="Position.Right" class="handle handle-purple" />
          </div>
        </template>

        <!-- Queue Node -->
        <template #node-queue="props">
          <div class="node-queue">
            <div class="queue-icon">⏸️</div>
            <div class="queue-label">Request Queue</div>
            <div class="queue-subtitle">Waiting for Token <br> (max 5s)</div>
            <Handle type="target" :position="Position.Left" class="handle handle-yellow" />
            <Handle type="source" :position="Position.Right" class="handle handle-yellow" />
          </div>
        </template>

        <!-- Mobile Node -->
        <template #node-mobile="props">
          <div class="node-mobile">
            <div class="mobile-notch"></div>
            <div class="mobile-icon">📱</div>
            <div class="mobile-text">Secure Storage<br>(Keychain)</div>
            <Handle type="source" :position="Position.Right" class="handle handle-gray" />
          </div>
        </template>

      </VueFlow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueFlow, Position, Handle, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/controls/dist/style.css'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { fitView } = useVueFlow()
const currentScenario = ref<keyof typeof scenarios>('login')
const elements = ref<any[]>([])

const scenarios = {
  // --- SCENARIO 1: LOGIN ---
  login: {
    label: '1. Login & Storage',
    short: 'Client vs Server Storage',
    title: 'Login Flow & Token Storage',
    desc: 'Server sets two tokens with different permissions: Access Token (client can read) and Refresh Token (server only, HttpOnly).',
    data: [
      { 
        id: 'c1', type: 'client', position: { x: 50, y: 100 }, 
        data: { 
          url: 'explorer.app.camporganizer.app',
          access: '<span style="color: #34d399">JWT Token</span><br/><span style="font-size: 9px; opacity: 0.5">TTL: 10m</span>',
          refresh: '<span style="color: #60a5fa">Refresh Token</span><br/><span style="font-size: 9px; opacity: 0.5">TTL: 30d</span>'
        }
      },
      { id: 'api', type: 'api', position: { x: 600, y: 150 }, label: 'Auth Service' },
      
      { id: 'e1', source: 'c1', target: 'api', label: '1. POST /login', animated: true, sourceHandle: 'access-out', style: { stroke: '#94a3b8' } },
      { id: 'e2', source: 'api', target: 'c1', label: '2. Access (Client)', animated: true, targetHandle: 'access-in', style: { stroke: '#10b981', strokeWidth: 2 }, type: 'smoothstep' },
      { id: 'e3', source: 'api', target: 'c1', label: '3. Refresh (HttpOnly)', animated: true, targetHandle: 'refresh-in', style: { stroke: '#3b82f6', strokeWidth: 2 }, type: 'smoothstep' }
    ]
  },

  // --- SCENARIO 2: REQUEST LOGIC (JS PRE-CHECK) ---
  request: {
    label: '2. Request Logic',
    short: 'Client-side Check',
    title: 'Smart Request Flow with Queue',
    desc: 'Before each request, check not only token presence but also its TTL. If token is missing OR TTL < 1/3 of lifetime - queue request, do preventive refresh, then execute.',
    data: [
      // Top row - flow start
      { id: 'start', type: 'default', position: { x: 214.61, y: 44.33 }, label: 'Start useFetch()', class: 'tw-bg-blue-600 tw-text-white tw-border-none tw-rounded-full' },
      { id: 'is_private', type: 'logic', position: { x: 214.17, y: 148.70 }, label: 'Is Private Route?' },
      
      // Public API on the left
      { id: 'public_req', type: 'api', position: { x: 222.35, y: 464.77 }, label: 'Public API' },
      
      // Central flow
      { id: 'check_token', type: 'logic', position: { x: 397.69, y: 211.78 }, label: 'Has Token & TTL > 1/3 Life?' },
      
      // Happy path - direct execution (fresh token)
      { id: 'do_req', type: 'api', position: { x: 763.80, y: 265.97 }, label: '🚀 Execute Request', class: 'execute-request-node' },
      { id: 'success', type: 'default', position: { x: 1411.71, y: 232.37 }, label: '✅ Success', class: 'tw-bg-emerald-600 tw-text-white tw-border-none' },
      
      // Middle path - Promise Queue (unified for missing token OR low TTL)
      { id: 'queue', type: 'queue', position: { x: 511.62, y: 490.07 }, label: 'Promise Queue' },
      { id: 'promise_resolve', type: 'default', position: { x: 519.37, y: 710.24 }, label: 'Await Promise', class: 'tw-bg-purple-600 tw-text-white tw-border-none' },
      { id: 'pre_refresh', type: 'api', position: { x: 500.67, y: 779.61 }, label: '🔄 Refresh Token' },
      
      // Bottom path - 401 Queue (linear horizontal flow)
      { id: 'check_401', type: 'logic', position: { x: 935.04, y: 393.15 }, label: 'Is 498 Error?' },
      { id: 'queue_401', type: 'queue', position: { x: 872.90, y: 656.52 }, label: '498 Queue' },
      { id: 'retry_refresh', type: 'api', position: { x: 1182.51, y: 682.53 }, label: '🔄 Retry Refresh' },
      
      // Bottom - Logout
      { id: 'login', type: 'default', position: { x: 1347.99, y: 846.27 }, label: '🚪 Logout', class: 'tw-bg-red-600 tw-text-white tw-border-none' },
      { id: 'clear_api', type: 'api', position: { x: 1347.99, y: 950 }, label: 'POST /auth/logout' },

      // Edges
      { id: 'e1', source: 'start', target: 'is_private', animated: true },
      { id: 'e2', source: 'is_private', target: 'public_req', label: 'No', style: { stroke: '#94a3b8' } },
      { id: 'e3', source: 'is_private', target: 'check_token', label: 'Yes', style: { stroke: '#fbbf24' } },
      
      // Token check - fresh path
      { id: 'e4', source: 'check_token', target: 'do_req', label: 'Yes', style: { stroke: '#10b981', strokeWidth: 2 } },
      
      // Token check - needs refresh path (Missing OR Low TTL unified)
      { id: 'e5', source: 'check_token', target: 'queue', label: 'No', style: { stroke: '#f87171', strokeWidth: 2 } },
      
      // Queue to promise
      { id: 'e6', source: 'queue', target: 'promise_resolve', label: 'Wait', animated: true, style: { stroke: '#a78bfa', strokeWidth: 2 } },
      { id: 'e7', source: 'promise_resolve', target: 'pre_refresh', animated: true, style: { stroke: '#a78bfa', strokeWidth: 2 } },
      { id: 'e8', source: 'pre_refresh', target: 'do_req', label: 'Token Ready', style: { stroke: '#10b981', strokeWidth: 2 }, type: 'step' },
      { id: 'e9', source: 'pre_refresh', target: 'login', label: 'Fail', style: { stroke: '#f87171' } },
      
      // Request execution
      { id: 'e10', source: 'do_req', target: 'success', label: '200 OK', style: { stroke: '#10b981' } },
      { id: 'e11', source: 'do_req', target: 'check_401', animated: true, style: { stroke: '#ec4899' }, type: 'step' },
      
      // 401 Queue path (linear horizontal)
      { id: 'e13', source: 'check_401', target: 'queue_401', label: 'Yes (498)', style: { stroke: '#f87171', strokeWidth: 2 } },
      { id: 'e14', source: 'queue_401', target: 'retry_refresh', label: 'ONE Refresh', animated: true, style: { stroke: '#ec4899', strokeWidth: 3 } },
      { id: 'e15', source: 'retry_refresh', target: 'do_req', label: 'Retry', style: { stroke: '#60a5fa', strokeWidth: 2, strokeDasharray: '5,5' }, type: 'smoothstep' },
      { id: 'e16', source: 'retry_refresh', target: 'login', label: 'Fail', style: { stroke: '#f87171' }, type: 'smoothstep' },
      
      // Logout path
      { id: 'e17', source: 'login', target: 'clear_api', animated: true, style: { stroke: '#f87171', strokeWidth: 2 } }
    ]
  },

  // --- SCENARIO 3: SSR ---
  ssr: {
    label: '3. SSR Handling',
    short: 'Server-side',
    title: 'Nuxt SSR Token Handling',
    desc: 'Nuxt server automatically receives cookies. It uses Refresh Cookie to update session if Access Cookie expired.',
    data: [
      { 
        id: 'browser', type: 'client', position: { x: 0, y: 100 }, 
        data: { 
          url: 'Page Request',
          access: '<span style="color: #64748b; opacity: 0.5">Expired</span>',
          refresh: '<span style="color: #60a5fa; font-weight: bold">Valid & Secure</span>'
        } 
      },
      { id: 'nuxt', type: 'ssr', position: { x: 450, y: 100 }, label: 'Nuxt Server' },
      { id: 'api', type: 'api', position: { x: 800, y: 100 }, label: 'Auth Service' },

      { id: 'e1', source: 'browser', target: 'nuxt', label: '1. GET (Cookies)', animated: true, sourceHandle: 'refresh-out', style: { stroke: '#3b82f6' } },
      { id: 'e2', source: 'nuxt', target: 'api', label: '2. Refresh', animated: true, style: { stroke: '#00DC82' } },
      { id: 'e3', source: 'api', target: 'nuxt', label: '3. New Tokens', animated: true, style: { stroke: '#10b981' } },
      { id: 'e4', source: 'nuxt', target: 'browser', label: '4. Set-Cookie', animated: true, targetHandle: 'access-in', style: { stroke: '#10b981', strokeWidth: 2 } }
    ]
  },

  // --- SCENARIO 4: ECOSYSTEM ---
  ecosystem: {
    label: '4. Isolation',
    short: 'Host-Only Policy',
    title: 'Ecosystem & No Isolation (Shared Cookies)',
    desc: 'Cookies are shared by domain! If user logs in ONE tab - ALL tabs on same domain automatically see the login because they share the same cookie jar.',
    data: [
      // APP 1 - Tab 1
      { 
        id: 'explorer_tab1', type: 'client', position: { x: 0, y: 0 }, 
        data: { 
          url: 'explorer.app (Tab 1)',
          access: '<span style="color: #34d399">Access Token 🔓</span>',
          refresh: '<span style="color: #60a5fa">Refresh Token 🔒</span>'
        } 
      },

      // SHARED COOKIES WARNING
      {
        id: 'shared_cookies', type: 'default', position: { x: 300, y: 50 },
        label: '⚠️ SHARED COOKIES (by domain)',
        class: 'tw-bg-orange-600/30 tw-border-orange-500 tw-text-orange-300 tw-text-[12px] tw-font-bold',
        style: { width: '220px', height: '50px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ea580c' }
      },

      // APP 1 - Tab 2
      { 
        id: 'explorer_tab2', type: 'client', position: { x: 600, y: 0 }, 
        data: { 
          url: 'explorer.app (Tab 2)',
          access: '<span style="color: #34d399">Access Token 🔓</span>',
          refresh: '<span style="color: #60a5fa">Refresh Token 🔒</span>'
        } 
      },

      { id: 'auth', type: 'api', position: { x: 300, y: 250 }, label: 'Auth Service' },

      { id: 'e1', source: 'explorer_tab1', target: 'auth', label: 'Login', animated: true, sourceHandle: 'refresh-out', style: { stroke: '#10b981' } },
      { id: 'e2', source: 'auth', target: 'shared_cookies', label: 'Set-Cookie (Domain)', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
      { id: 'e3', source: 'shared_cookies', target: 'explorer_tab2', label: 'All Tabs See It!', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
      { id: 'e4', source: 'explorer_tab2', target: 'auth', label: 'Already Logged In!', animated: true, sourceHandle: 'refresh-out', style: { stroke: '#10b981' } },
    ]
  },

  // --- SCENARIO 5: TAB VISIBILITY ---
  visibility: {
    label: '5. Tab Focus',
    short: 'Auto Token Check',
    title: 'Automatic Token Refresh on Tab Focus',
    desc: 'When user returns to the tab after long absence (visibilitychange), app automatically checks Access Token and refreshes it if expired.',
    data: [
      { id: 'tab_hidden', type: 'default', position: { x: 0, y: 0 }, label: '😴 Tab Hidden', class: 'tw-bg-slate-700 tw-text-slate-400 tw-border-slate-600' },
      { id: 'user_back', type: 'default', position: { x: 0, y: 100 }, label: '👀 User Returns', class: 'tw-bg-blue-600 tw-text-white tw-border-none' },
      { id: 'visibility_event', type: 'default', position: { x: 0, y: 200 }, label: '📡 visibilitychange', class: 'tw-bg-purple-600 tw-text-white tw-border-none tw-text-xs' },
      
      { id: 'check_token', type: 'logic', position: { x: 250, y: 200 }, label: 'Check Access Token' },
      
      { id: 'token_valid', type: 'default', position: { x: 250, y: 50 }, label: '✅ Still Valid', class: 'tw-bg-emerald-600 tw-text-white tw-border-none' },
      
      { id: 'token_expired', type: 'logic', position: { x: 500, y: 200 }, label: 'Token Expired?' },
      { id: 'refresh_api', type: 'api', position: { x: 500, y: 350 }, label: '🔄 Silent Refresh' },
      { id: 'refresh_success', type: 'default', position: { x: 750, y: 200 }, label: '✅ Ready', class: 'tw-bg-emerald-600 tw-text-white tw-border-none' },
      { id: 'logout', type: 'default', position: { x: 500, y: 500 }, label: '🚪 Force Logout', class: 'tw-bg-red-600 tw-text-white tw-border-none' },

      // Edges
      { id: 'e1', source: 'tab_hidden', target: 'user_back', label: 'Long Time', animated: true, style: { stroke: '#64748b', strokeDasharray: '5,5' } },
      { id: 'e2', source: 'user_back', target: 'visibility_event', animated: true, style: { stroke: '#a78bfa' } },
      { id: 'e3', source: 'visibility_event', target: 'check_token', animated: true, style: { stroke: '#a78bfa' } },
      { id: 'e4', source: 'check_token', target: 'token_valid', label: 'Valid & Fresh', style: { stroke: '#10b981' } },
      { id: 'e5', source: 'check_token', target: 'token_expired', label: 'Check Expiry', style: { stroke: '#fbbf24' } },
      { id: 'e6', source: 'token_expired', target: 'refresh_api', label: 'Yes (Expired)', style: { stroke: '#f87171' } },
      { id: 'e7', source: 'refresh_api', target: 'refresh_success', label: 'New Token', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'e8', source: 'refresh_api', target: 'logout', label: 'Refresh Failed', style: { stroke: '#f87171' } },
      { id: 'e9', source: 'token_expired', target: 'refresh_success', label: 'No (Still Valid)', style: { stroke: '#10b981' }, type: 'step' }
    ]
  },

  // --- SCENARIO 6: PARALLEL REQUESTS QUEUE ---
  parallel: {
    label: '6. Race Condition',
    short: 'Multiple 401s',
    title: 'Parallel Requests Queue (Refresh Lock)',
    desc: '3 parallel requests simultaneously get 401. Instead of 3 refresh requests, first one locks the queue, does single refresh, others wait and retry with new token.',
    data: [
      // 3 parallel requests
      { id: 'req1', type: 'default', position: { x: 0, y: 0 }, label: 'GET /profile', class: 'tw-bg-slate-700 tw-text-white tw-border-slate-600 tw-text-sm tw-px-3 tw-py-2' },
      { id: 'req2', type: 'default', position: { x: 0, y: 80 }, label: 'GET /orders', class: 'tw-bg-slate-700 tw-text-white tw-border-slate-600 tw-text-sm tw-px-3 tw-py-2' },
      { id: 'req3', type: 'default', position: { x: 0, y: 160 }, label: 'POST /cart', class: 'tw-bg-slate-700 tw-text-white tw-border-slate-600 tw-text-sm tw-px-3 tw-py-2' },

      // API
      { id: 'api', type: 'api', position: { x: 300, y: 80 }, label: 'Resource API' },

      // Все получают 401
      { id: 'all_401', type: 'default', position: { x: 550, y: 80 }, label: '⚠️ All 498', class: 'tw-bg-orange-600 tw-text-white tw-border-none tw-font-bold' },

      // QUEUE - lock
      { id: 'queue', type: 'queue', position: { x: 300, y: 250 } },

      // Refresh
      { id: 'refresh', type: 'api', position: { x: 550, y: 250 }, label: 'Auth Service (Refresh)' },

      // Success
      { id: 'unlocked', type: 'default', position: { x: 800, y: 80 }, label: '✅ Queue Unlocked', class: 'tw-bg-emerald-600 tw-text-white tw-border-none' },
      { id: 'retry_all', type: 'default', position: { x: 800, y: 180 }, label: '🔄 Retry All 3', class: 'tw-bg-blue-600 tw-text-white tw-border-none' },

      // Edges - requests go to API
      { id: 'e1', source: 'req1', target: 'api', animated: true, style: { stroke: '#94a3b8' } },
      { id: 'e2', source: 'req2', target: 'api', animated: true, style: { stroke: '#94a3b8' } },
      { id: 'e3', source: 'req3', target: 'api', animated: true, style: { stroke: '#94a3b8' } },

      // API returns 401
      { id: 'e4', source: 'api', target: 'all_401', label: '401 ×3', style: { stroke: '#f97316', strokeWidth: 2 } },

      // All enter queue
      { id: 'e5', source: 'all_401', target: 'queue', label: 'Queue Lock', style: { stroke: '#fbbf24', strokeWidth: 2 } },

      // Single refresh
      { id: 'e6', source: 'queue', target: 'refresh', label: 'ONE Refresh', animated: true, style: { stroke: '#f87171', strokeWidth: 3 } },

      // Success - unlock
      { id: 'e7', source: 'refresh', target: 'unlocked', label: 'New Token', style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'e8', source: 'unlocked', target: 'retry_all', animated: true, style: { stroke: '#60a5fa', strokeWidth: 2 } },

      // Retry requests
      { id: 'e9', source: 'retry_all', target: 'api', label: 'With New Token', style: { stroke: '#10b981', strokeDasharray: '5,5' }, type: 'step' }
    ]
  }
}

const loadScenario = (key: keyof typeof scenarios) => {
  currentScenario.value = key
  elements.value = scenarios[key].data
  router.push({ query: { scenario: key } })
  setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 50)
}

const exportState = () => {
  const state = elements.value.map((node: any) => ({
    id: node.id,
    position: node.position,
    ...(node.label && { label: node.label }),
    ...(node.type && { type: node.type }),
  }))
  
  const jsonStr = JSON.stringify(state, null, 2)
  console.log('Exported state:', jsonStr)
  
  // Copy to clipboard
  navigator.clipboard.writeText(jsonStr).then(() => {
    alert('Layout JSON copied to clipboard! Check console for full output.')
  }).catch(() => {
    alert('Check browser console (F12) for JSON')
  })
}

onMounted(() => {
  const scenarioParam = route.query.scenario as keyof typeof scenarios
  if (scenarioParam && scenarioParam in scenarios) {
    loadScenario(scenarioParam)
  } else {
    loadScenario('login')
  }
})
</script>

<style scoped>
.page-wrapper {
  height: 100vh;
  width: 100%;
  background: #020617;
  color: white;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  margin: 0;
  padding: 0;
}

/* Sidebar */
.sidebar {
  width: 256px;
  background: #0f172a;
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  z-index: 20;
}

.sidebar-header {
  padding: 24px 16px;
  border-bottom: 1px solid #1e293b;
}

.sidebar-header h2 {
  font-weight: 700;
  color: #60a5fa;
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  line-height: 1.3;
}

.subtitle {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.home-link {
  display: inline-block;
  padding: 8px 16px;
  background: #1e293b;
  color: #60a5fa;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid #334155;
  transition: all 0.2s;
}

.home-link:hover {
  background: #334155;
  border-color: #475569;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.menu-item {
  width: 100%;
  text-align: left;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;
  color: #94a3b8;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 4px;
}

.menu-item:hover {
  background: #1e293b;
}

.menu-item.active {
  background: rgba(37, 99, 235, 0.2);
  color: #93c5fd;
  border: 1px solid #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.menu-title {
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 4px;
}

.menu-desc {
  font-size: 0.625rem;
  opacity: 0.7;
  line-height: 1.4;
}

.sidebar-footer {
  padding: 16px;
  font-size: 0.625rem;
  color: #475569;
  border-top: 1px solid #1e293b;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #94a3b8;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.green {
  background: #10b981;
}

.legend-dot.blue {
  background: #3b82f6;
}

.home-link {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 16px;
  background: #1e293b;
  color: #60a5fa;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #334155;
  transition: all 0.2s;
  width: 100%;
  text-align: center;
}

.home-link:hover {
  background: #334155;
  border-color: #475569;
}

/* Main Content */
.main-content {
  flex: 1;
  position: relative;
}

.header-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  pointer-events: none;
}

.header-overlay h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
}

.header-overlay p {
  color: #94a3b8;
  margin: 0 0 12px 0;
  font-size: 0.875rem;
}

.export-btn {
  pointer-events: auto;
  padding: 8px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  color: #60a5fa;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.export-btn:hover {
  background: #334155;
  border-color: #475569;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
}

.flow-canvas {
  background: #020617;
  height: 100%;
  width: 100%;
}

:deep(.flow-controls) {
  fill: #60a5fa;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

:deep(.flow-controls button) {
  background: transparent;
  border: none;
  color: #60a5fa;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

:deep(.flow-controls button:hover) {
  background: #334155;
  color: #93c5fd;
}

:deep(.flow-controls svg) {
  width: 20px;
  height: 20px;
}

/* Node Styles */
.node-client {
  width: 288px;
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.browser-bar {
  background: #1e293b;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #334155;
}

.url-bar {
  font-size: 0.75rem;
  color: #94a3b8;
  font-family: 'Monaco', 'Courier New', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 8px;
}

.client-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.storage-block {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
  padding: 12px;
  position: relative;
}

.storage-block.client-stored {
  border: 1px solid rgba(16, 185, 129, 0.3);
  background: rgba(16, 185, 129, 0.05);
}

.storage-block.server-stored {
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.05);
}

.storage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.storage-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #cbd5e1;
}

.storage-badge {
  font-size: 0.625rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
}

.storage-badge.client {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.storage-badge.server {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.storage-content {
  font-size: 0.75rem;
  color: #cbd5e1;
  font-family: 'Monaco', 'Courier New', monospace;
  margin-bottom: 6px;
}

.storage-note {
  font-size: 0.625rem;
  color: #94a3b8;
  font-style: italic;
}

.node-ssr {
  width: 192px;
  background: linear-gradient(135deg, rgba(0, 220, 130, 0.1), #0f172a);
  border: 2px solid #00DC82;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 0 15px rgba(0, 220, 130, 0.2);
  position: relative;
}

.ssr-title {
  color: #00DC82;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.ssr-step {
  font-size: 0.625rem;
  color: #cbd5e1;
  margin-bottom: 6px;
}

.node-api {
  padding: 12px 16px;
  background: #0f172a;
  border: 2px solid #a855f7;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.api-label {
  font-size: 0.75rem;
  color: #c084fc;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
}

.api-icon {
  font-size: 2rem;
}

.node-queue {
  width: 128px;
  height: 128px;
  background: #1e293b;
  border: 2px dashed #fbbf24;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.queue-icon {
  font-size: 2rem;
  margin-bottom: 4px;
}

.queue-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fbbf24;
}

.queue-subtitle {
  font-size: 0.625rem;
  color: #94a3b8;
  margin-top: 4px;
}

.node-mobile {
  width: 96px;
  height: 160px;
  background: #0f172a;
  border: 2px solid #475569;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.mobile-notch {
  position: absolute;
  top: 8px;
  width: 32px;
  height: 4px;
  background: #334155;
  border-radius: 2px;
}

.mobile-icon {
  font-size: 3rem;
}

.mobile-text {
  font-size: 0.625rem;
  text-align: center;
  margin-top: 8px;
  color: #cbd5e1;
  line-height: 1.3;
}

.mobile-text {
  font-size: 0.625rem;
  text-align: center;
  margin-top: 8px;
  color: #cbd5e1;
  line-height: 1.3;
}

/* Window Dots */
.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: rgba(239, 68, 68, 0.8); }
.dot.yellow { background: rgba(234, 179, 8, 0.8); }
.dot.green { background: rgba(34, 197, 94, 0.8); }

/* Handles */
.handle {
  width: 8px;
  height: 8px;
  border: 2px solid #020617;
}

.handle-green {
  background: #10b981;
}

.handle-blue {
  background: #3b82f6;
}

.handle-purple {
  background: #a855f7;
}

.handle-yellow {
  background: #fbbf24;
}

.handle-gray {
  background: #64748b;
}

.handle-nuxt {
  background: #00DC82;
}

/* Vue Flow Edge Styles */
:deep(.vue-flow__edge-textbg) {
  fill: #0f172a;
  opacity: 0.8;
}

:deep(.vue-flow__edge-text) {
  fill: #cbd5e1;
  font-size: 11px;
  font-weight: 600;
}

:deep(.vue-flow__attribution) {
  display: none;
}

:deep(.execute-request-node) {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2)) !important;
  border: 2px solid #a855f7 !important;
  border-radius: 8px !important;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 15px rgba(236, 72, 153, 0.15) !important;
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
  
  .header-overlay h1 {
    font-size: 1.25rem;
  }
  
  .header-overlay p {
    font-size: 0.75rem;
  }
  
  .node-client {
    width: 240px;
  }
}
</style>
