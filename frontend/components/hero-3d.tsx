"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function CodeCube() {
  return (
    <Float speed={1} rotationIntensity={0.35} floatIntensity={0.75}>
      <mesh rotation={[0.5, 0.75, 0.2]}>
        <boxGeometry args={[1.75, 1.75, 1.75]} />
        <meshStandardMaterial color="#0891b2" metalness={0.35} roughness={0.38} transparent opacity={0.82} />
      </mesh>
      <mesh position={[1.55, -0.95, -0.4]} rotation={[0.15, -0.45, 0.1]}>
        <boxGeometry args={[1.5, 0.18, 0.95]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.2} roughness={0.5} transparent opacity={0.65} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[360px] min-h-[300px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,.2),transparent_40%),linear-gradient(135deg,rgba(15,23,42,.92),rgba(8,13,29,.98))]">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={1} performance={{ min: 0.5 }}>
        <ambientLight intensity={1.35} />
        <pointLight position={[3, 4, 5]} intensity={2.5} color="#67e8f9" />
        <CodeCube />
      </Canvas>
      <div className="pointer-events-none absolute left-5 top-5 w-56 rounded-xl border border-cyan-300/25 bg-slate-950/78 p-3 font-mono text-[10px] text-cyan-100 shadow-2xl backdrop-blur">
        <div className="text-cyan-300">GET /api/projects</div>
        <div className="mt-1 text-white/70">Laravel Resource - Next UI</div>
        <div className="mt-2 h-1.5 rounded bg-cyan-300/70" />
        <div className="mt-1 h-1.5 w-3/4 rounded bg-blue-400/60" />
      </div>
    </div>
  );
}
