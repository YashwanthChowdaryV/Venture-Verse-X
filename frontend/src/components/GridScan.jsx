import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSensitivity;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform float uGridScale;
uniform vec3 uScanColor;
uniform float uScanOpacity;
uniform bool uEnablePost;
uniform float uBloomIntensity;
uniform float uChromaticAberration;
uniform float uNoiseIntensity;
uniform float uLineJitter;
uniform float uScanGlow;
uniform float uScanSoftness;

varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 bloom(vec3 color, float intensity) {
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  return color + luminance * intensity * 0.3;
}

void main() {
  vec2 uv = vUv;
  vec2 centeredUv = uv - 0.5;
  centeredUv.x *= uResolution.x / uResolution.y;

  float dist = length(centeredUv);

  // Grid
  vec2 gridUv = uv * uResolution / (uResolution.x * uGridScale);
  float jitterX = random(floor(gridUv)) * uLineJitter;
  float jitterY = random(floor(gridUv.yx)) * uLineJitter;
  vec2 jitteredUv = gridUv + vec2(jitterX, jitterY);

  float gridX = abs(fract(jitteredUv.x - 0.5) - 0.5) / fwidth(jitteredUv.x);
  float gridY = abs(fract(jitteredUv.y - 0.5) - 0.5) / fwidth(jitteredUv.y);
  float grid = min(gridX, gridY);
  float gridLine = 1.0 - min(grid * uLineThickness * uSensitivity, 1.0);

  vec3 gridColor = uLinesColor * gridLine;

  // Scan line
  float scanY = fract(uTime * 0.15);
  float scanDist = abs(uv.y - scanY);
  float scanLine = exp(-scanDist * uScanSoftness) * uScanGlow;
  scanLine += smoothstep(0.02, 0.0, scanDist) * 0.3;

  vec3 scanEffect = uScanColor * scanLine * uScanOpacity;

  // Combine
  vec3 color = gridColor + scanEffect;

  // Bloom
  if (uEnablePost) {
    color = bloom(color, uBloomIntensity);
  }

  // Noise
  float noise = random(uv + uTime * 0.1) * uNoiseIntensity;
  color += noise;

  // Vignette
  float vignette = 1.0 - dist * 1.2;
  vignette = smoothstep(0.0, 0.8, vignette);
  color *= vignette;

  gl_FragColor = vec4(color, 0.6);
}
`;

const GridScan = ({
    sensitivity = 0.55,
    lineThickness = 1,
    linesColor = '#2F293A',
    gridScale = 0.1,
    scanColor = '#FF9FFC',
    scanOpacity = 0.4,
    enablePost = true,
    bloomIntensity = 0.6,
    chromaticAberration = 0.002,
    noiseIntensity = 0.01,
    lineJitter = 0.1,
    scanGlow = 0.5,
    scanSoftness = 2,
    enableWebcam = false,
    showPreview = false,
}) => {
    const containerRef = useRef(null);
    const animationIdRef = useRef(null);
    const uniformsRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
                : [0.5, 0.5, 0.5];
        };

        const renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true,
        });
        const gl = renderer.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        containerRef.current.appendChild(gl.canvas);

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: [1, 1] },
            uSensitivity: { value: sensitivity },
            uLineThickness: { value: lineThickness },
            uLinesColor: { value: hexToRgb(linesColor) },
            uGridScale: { value: gridScale },
            uScanColor: { value: hexToRgb(scanColor) },
            uScanOpacity: { value: scanOpacity },
            uEnablePost: { value: enablePost },
            uBloomIntensity: { value: bloomIntensity },
            uChromaticAberration: { value: chromaticAberration },
            uNoiseIntensity: { value: noiseIntensity },
            uLineJitter: { value: lineJitter },
            uScanGlow: { value: scanGlow },
            uScanSoftness: { value: scanSoftness },
        };
        uniformsRef.current = uniforms;

        const geometry = new Triangle(gl);
        const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms });
        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            if (!containerRef.current) return;
            const { clientWidth: w, clientHeight: h } = containerRef.current;
            renderer.setSize(w, h);
            uniforms.uResolution.value = [w, h];
        };

        window.addEventListener('resize', resize);
        resize();

        const render = (t) => {
            uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
            animationIdRef.current = requestAnimationFrame(render);
        };
        animationIdRef.current = requestAnimationFrame(render);

        const container = containerRef.current;
        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            window.removeEventListener('resize', resize);
            try { renderer.gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch (e) { }
            if (container?.contains(gl.canvas)) container.removeChild(gl.canvas);
        };
    }, []);

    useEffect(() => {
        if (!uniformsRef.current) return;
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
                : [0.5, 0.5, 0.5];
        };
        uniformsRef.current.uSensitivity.value = sensitivity;
        uniformsRef.current.uLineThickness.value = lineThickness;
        uniformsRef.current.uLinesColor.value = hexToRgb(linesColor);
        uniformsRef.current.uGridScale.value = gridScale;
        uniformsRef.current.uScanColor.value = hexToRgb(scanColor);
        uniformsRef.current.uScanOpacity.value = scanOpacity;
        uniformsRef.current.uEnablePost.value = enablePost;
        uniformsRef.current.uBloomIntensity.value = bloomIntensity;
        uniformsRef.current.uChromaticAberration.value = chromaticAberration;
        uniformsRef.current.uNoiseIntensity.value = noiseIntensity;
        uniformsRef.current.uLineJitter.value = lineJitter;
        uniformsRef.current.uScanGlow.value = scanGlow;
        uniformsRef.current.uScanSoftness.value = scanSoftness;
    }, [sensitivity, lineThickness, linesColor, gridScale, scanColor, scanOpacity, enablePost, bloomIntensity, chromaticAberration, noiseIntensity, lineJitter, scanGlow, scanSoftness]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        />
    );
};

export default GridScan;