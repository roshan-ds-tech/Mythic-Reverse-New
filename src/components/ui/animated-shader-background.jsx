import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedShaderBackground = ({ className, ...props }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    // Shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.5;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
          }
          return v;
        }

        void mainImage( out vec4 fragColor, in vec2 fragCoord )
        {
            vec2 uv = fragCoord.xy / iResolution.xy;
            vec2 px = 2.0 * uv - 1.0;
            px.x *= iResolution.x / iResolution.y;

            float time = iTime * 0.8;
            
            // Primary flow - Boosted to match About Us brightness
            vec2 p = px;
            float q = fbm(p - time * 0.1);
            vec2 r = vec2(fbm(p + q + time * 0.4 - p.x - p.y), fbm(p + q - time * 0.2));
            vec3 c = mix(vec3(0.22, 0.0, 0.45), vec3(0.4, 0.0, 0.7), fbm(p + r)); // Brighter purple base
            
            // Neon veins
            float vein = fbm(p * 3.0 + r * 5.0 + time);
            c = mix(c, vec3(0.85, 0.25, 1.0), smoothstep(0.0, 1.0, vein * vein * vein) * 0.65); 
            
            // Secondary glow
            float glow = fbm(p * 6.0 - time * 0.5);
            c = mix(c, vec3(0.7, 0.05, 0.95), smoothstep(0.0, 1.0, glow * glow) * 0.55); 
            
            // Extra "Intense" burst
            float burst = fbm(p * 10.0 + time);
            c += vec3(0.4, 0.05, 0.6) * smoothstep(0.4, 1.0, burst);

            // Subtle vignette for focus
            float vignette = 1.0 - length(uv - 0.5) * 0.9;
            c *= clamp(vignette, 0.0, 1.0);

            fragColor = vec4(c, 0.7);
        }

        void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      if (material) {
        material.uniforms.iResolution.value.set(width, height);
      }
    };

    // Updates
    window.addEventListener('resize', updateSize);
    updateSize();

    // Animation Loop
    let animationFrameId;
    const startTime = performance.now();
    const fpsInterval = 1000 / 30; // Throttle to 30fps
    let lastFrameTime = 0;

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < fpsInterval) return;
      lastFrameTime = currentTime - (elapsed % fpsInterval);
      material.uniforms.iTime.value = (performance.now() - startTime) * 0.001;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default AnimatedShaderBackground;
