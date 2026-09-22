/* ==========================================================================
   Router – tiny hash router.  #/learn/animals  ->  route '/learn/:id'
   Pages are objects { render(params) -> html, mount(container, params), destroy() }
   ========================================================================== */
KW.router = {
  routes: [],
  current: null,

  add(pattern, page) {
    const re = new RegExp('^' + pattern.replace(/\//g, '\\/').replace(/:(\w+)/g, '(?<$1>[^\\/]+)') + '\\/?$');
    this.routes.push({ pattern, re, page });
  },

  go(hash) { location.hash = hash; },

  path() {
    let p = location.hash.replace(/^#/, '') || '/';
    if (!p.startsWith('/')) p = '/' + p;
    return p.split('?')[0];
  },

  start() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },

  resolve() {
    const path = this.path();
    const app = document.getElementById('app');
    let match = null, params = {};
    for (const r of this.routes) {
      const m = path.match(r.re);
      if (m) { match = r; params = m.groups || {}; break; }
    }
    if (!match) { match = this.routes.find(r => r.pattern === '/404'); }

    // Tear down the previous page
    if (this.current && this.current.destroy) { try { this.current.destroy(); } catch (e) { /* ignore */ } }
    KW.ui.closeModal();
    KW.sound.stopSpeaking();

    const page = match.page;
    this.current = page;
    app.innerHTML = page.render(params);
    app.classList.remove('anim-fade'); void app.offsetWidth; app.classList.add('anim-fade');
    if (page.mount) page.mount(app, params);
    KW.ui.enhance(app);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    // Highlight nav link
    KW.utils.$$('.nav-link').forEach(a => {
      const r = a.getAttribute('data-route');
      const active = r === '/' ? path === '/' : path.startsWith(r);
      a.classList.toggle('active', active);
    });
    document.getElementById('nav-links').classList.remove('open');
    document.title = (page.title ? page.title + ' · ' : '') + KW.config.siteName;
  }
};
