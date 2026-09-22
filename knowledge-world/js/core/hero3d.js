/* ==========================================================================
   Hero 3D scene (Three.js) – low-poly planet, rings, moons, floating shapes,
   starfield and mouse parallax. Falls back to CSS gradient if WebGL missing.
   ========================================================================== */
KW.hero3d = {
  running: false,

  init(canvas) {
    if (!window.THREE) { canvas.style.display = 'none'; return; }
    try { this._build(canvas); } catch (e) { console.warn('3D hero disabled:', e); canvas.style.display = 'none'; }
  },

  _build(canvas) {
    const T = THREE;
    const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    const wide = window.innerWidth > 800;
    const baseX = wide ? -3.2 : 0, baseY = wide ? 0.2 : 1.4;
    camera.position.set(baseX, baseY, 9);

    // Lights
    scene.add(new T.AmbientLight(0xffffff, 0.55));
    const key = new T.DirectionalLight(0xffffff, 1.1); key.position.set(5, 6, 6); scene.add(key);
    const rim = new T.PointLight(0xff6b81, 1.2, 40); rim.position.set(-6, -3, 4); scene.add(rim);
    const rim2 = new T.PointLight(0x4fb3ff, 1.0, 40); rim2.position.set(6, 4, -4); scene.add(rim2);

    // Planet group
    const planet = new T.Group();
    const sphere = new T.Mesh(new T.IcosahedronGeometry(1.7, 2), new T.MeshStandardMaterial({ color: 0x5b7cff, flatShading: true, roughness: 0.55, metalness: 0.15 }));
    planet.add(sphere);
    const wire = new T.Mesh(new T.IcosahedronGeometry(1.86, 1), new T.MeshBasicMaterial({ color: 0xa5b4ff, wireframe: true, transparent: true, opacity: 0.18 }));
    planet.add(wire);
    // continents: little green blobs on the surface
    const contMat = new T.MeshStandardMaterial({ color: 0x3ddc97, flatShading: true, roughness: 0.8 });
    for (let i = 0; i < 14; i++) {
      const blob = new T.Mesh(new T.DodecahedronGeometry(0.28 + Math.random() * 0.3, 0), contMat);
      const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
      const v = new T.Vector3(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)).multiplyScalar(1.62);
      blob.position.copy(v); blob.lookAt(0, 0, 0);
      blob.scale.set(1, 1, 0.35);
      planet.add(blob);
    }
    scene.add(planet);

    // Rings + moons
    const ring1 = new T.Mesh(new T.TorusGeometry(2.7, 0.05, 12, 120), new T.MeshStandardMaterial({ color: 0xffc940, emissive: 0x664d00, roughness: 0.4 }));
    ring1.rotation.x = Math.PI / 2.4; ring1.rotation.y = 0.3; scene.add(ring1);
    const ring2 = new T.Mesh(new T.TorusGeometry(3.4, 0.035, 12, 120), new T.MeshStandardMaterial({ color: 0xff6b81, emissive: 0x551a26, roughness: 0.4 }));
    ring2.rotation.x = Math.PI / 1.7; ring2.rotation.y = -0.5; scene.add(ring2);
    const moon1 = new T.Mesh(new T.IcosahedronGeometry(0.22, 1), new T.MeshStandardMaterial({ color: 0xffc940, flatShading: true }));
    const moon2 = new T.Mesh(new T.IcosahedronGeometry(0.17, 1), new T.MeshStandardMaterial({ color: 0xff6b81, flatShading: true }));
    scene.add(moon1, moon2);

    // Floating shapes
    const palette = [0xffc940, 0xff6b81, 0x00d2a8, 0x4fb3ff, 0xf368e0, 0xff9f43, 0x7ed957, 0xa29bfe];
    const geos = [
      () => new T.IcosahedronGeometry(0.3, 0), () => new T.BoxGeometry(0.45, 0.45, 0.45), () => new T.OctahedronGeometry(0.35, 0),
      () => new T.TetrahedronGeometry(0.38, 0), () => new T.TorusGeometry(0.25, 0.1, 8, 20), () => new T.ConeGeometry(0.28, 0.5, 6)
    ];
    const shapes = [];
    for (let i = 0; i < 34; i++) {
      const m = new T.Mesh(geos[i % geos.length](), new T.MeshStandardMaterial({ color: palette[i % palette.length], flatShading: true, roughness: 0.5 }));
      const x = (Math.random() - 0.5) * 18, y = (Math.random() - 0.5) * 9, z = -6 + Math.random() * 7;
      // keep them away from the planet centre
      if (Math.hypot(x, y) < 3.2) { m.position.set(x + (x < 0 ? -3.5 : 3.5), y, z); } else m.position.set(x, y, z);
      m.userData = { baseY: m.position.y, speed: 0.4 + Math.random() * 0.8, off: Math.random() * Math.PI * 2, rx: (Math.random() - 0.5) * 0.02, ry: (Math.random() - 0.5) * 0.02 };
      scene.add(m); shapes.push(m);
    }

    // Stars
    const starGeo = new T.BufferGeometry();
    const starPos = new Float32Array(900 * 3);
    for (let i = 0; i < 900 * 3; i += 3) { starPos[i] = (Math.random() - 0.5) * 60; starPos[i + 1] = (Math.random() - 0.5) * 40; starPos[i + 2] = -30 + Math.random() * 25; }
    starGeo.setAttribute('position', new T.BufferAttribute(starPos, 3));
    const stars = new T.Points(starGeo, new T.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.8 }));
    scene.add(stars);

    // Mouse parallax
    let mx = 0, my = 0;
    const onMove = e => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const clock = new T.Clock();
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this._raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      planet.rotation.y = t * 0.15;
      planet.rotation.x = Math.sin(t * 0.2) * 0.1;
      wire.rotation.y = -t * 0.08;
      ring1.rotation.z = t * 0.2; ring2.rotation.z = -t * 0.15;
      moon1.position.set(Math.cos(t * 0.7) * 2.7, Math.sin(t * 0.7) * 0.9, Math.sin(t * 0.7) * 2.7);
      moon2.position.set(Math.cos(-t * 0.5 + 2) * 3.4, Math.sin(-t * 0.5 + 2) * 1.4, Math.sin(-t * 0.5 + 2) * 3.4);
      shapes.forEach(s => {
        s.position.y = s.userData.baseY + Math.sin(t * s.userData.speed + s.userData.off) * 0.35;
        s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry;
      });
      stars.rotation.y = t * 0.01;
      camera.position.x += ((baseX + mx * 0.8) - camera.position.x) * 0.04;
      camera.position.y += ((baseY - my * 0.5) - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    loop();

    this._cleanup = () => {
      this.running = false;
      cancelAnimationFrame(this._raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      renderer.dispose();
    };
  },

  destroy() { if (this._cleanup) { this._cleanup(); this._cleanup = null; } }
};
