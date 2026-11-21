import React, { useEffect, useRef } from 'react';
import { HAND_CONNECTIONS, generateHandLandmarks, drawLandmarks } from '../utils/landmarkSimulator';

/**
 * HandLandmarkCanvas — Vintage Botanical Style
 * Renders 21 skeletal joints and bone connections using earthy forest green,
 * terracotta, sage, and rust lines.
 */
export default function HandLandmarkCanvas({
  liveLandmarks = null,
  activeGesture = 'namaste',
  gestureLabel = '',
  confidence = 96.5,
  isTwoHanded = false,
  width = 640,
  height = 480,
  showSkeleton = true,
  isLiveMode = true
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!showSkeleton) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // 1. REAL LIVE HAND TRACKING (MediaPipe Results)
      if (liveLandmarks && liveLandmarks.length > 0) {
        liveLandmarks.forEach((handPoints, handIdx) => {
          // Convert normalized (0-1) coordinates to canvas pixel space
          // Note: x is mirrored (1 - x) to match webcam scaleX(-1) mirror view!
          const pixelPoints = handPoints.map((pt, idx) => ({
            id: idx,
            x: (1 - pt.x) * canvas.width,
            y: pt.y * canvas.height,
            z: pt.z || 0
          }));

          // Draw skeleton lines (Dominant: Forest Green, Secondary: Terracotta)
          ctx.save();
          ctx.strokeStyle = handIdx === 0 ? 'rgba(38, 63, 50, 0.92)' : 'rgba(196, 119, 92, 0.92)';
          ctx.lineWidth = 3.2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
            const p1 = pixelPoints[startIdx];
            const p2 = pixelPoints[endIdx];
            if (p1 && p2) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });

          // Draw Joints (Earthy Botanical: Sage knuckles, Rust fingertips, Terracotta wrist)
          pixelPoints.forEach((pt, idx) => {
            const isTip = [4, 8, 12, 16, 20].includes(idx);
            const isWrist = idx === 0;

            ctx.beginPath();
            ctx.arc(pt.x, pt.y, isWrist ? 6.5 : isTip ? 5.5 : 4.5, 0, Math.PI * 2);
            ctx.fillStyle = isTip ? '#A65338' : isWrist ? '#C4775C' : '#A8B49A';
            ctx.fill();

            // Soft ivory border around joints
            ctx.strokeStyle = '#FFFDF8';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          });

          // Draw Bounding Box around detected hand
          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
          pixelPoints.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
          });

          const pad = 14;
          minX = Math.max(0, minX - pad);
          maxX = Math.min(canvas.width, maxX + pad);
          minY = Math.max(0, minY - pad);
          maxY = Math.min(canvas.height, maxY + pad);

          ctx.strokeStyle = handIdx === 0 ? 'rgba(38, 63, 50, 0.8)' : 'rgba(196, 119, 92, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
          ctx.setLineDash([]);

          // Header tag over bounding box (Deep Forest + Ivory text)
          const tag = handIdx === 0
            ? `${gestureLabel || 'Hand'} • ${Math.round(confidence)}%`
            : `Hand 2 • ${Math.round(confidence - 1)}%`;

          ctx.fillStyle = '#1C3027';
          const textWidth = ctx.measureText(tag).width + 16;
          ctx.fillRect(minX, Math.max(0, minY - 24), textWidth, 22);

          ctx.fillStyle = '#F8F5ED';
          ctx.font = '600 11px "DM Sans", system-ui, sans-serif';
          ctx.fillText(tag, minX + 8, Math.max(14, minY - 8));

          ctx.restore();
        });
      }
      // 2. SIMULATION MODE (Fallback when not using real live tracking or no hand yet)
      else if (!isLiveMode) {
        timeRef.current += 0.04;
        const primaryLandmarks = generateHandLandmarks(activeGesture, timeRef.current, false);
        drawLandmarks(ctx, primaryLandmarks, {
          jointColor: '#A8B49A',
          tipColor: '#A65338',
          lineColor: 'rgba(38, 63, 50, 0.85)',
          label: `Simulated: ${Math.round(confidence)}%`
        });

        if (isTwoHanded) {
          const secondaryLandmarks = generateHandLandmarks(activeGesture, timeRef.current + 0.5, true);
          drawLandmarks(ctx, secondaryLandmarks, {
            jointColor: '#C4775C',
            tipColor: '#A65338',
            lineColor: 'rgba(196, 119, 92, 0.85)',
            label: `Hand L (Sim)`
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [liveLandmarks, activeGesture, gestureLabel, confidence, isTwoHanded, showSkeleton, isLiveMode]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="landmark-canvas-overlay"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        objectFit: 'cover'
      }}
    />
  );
}
