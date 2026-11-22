import React, { useEffect, useRef } from 'react';
import { HAND_CONNECTIONS, generateHandLandmarks, drawLandmarks } from '../utils/landmarkSimulator';

/**
 * Static styling constants to avoid recreating string/color objects on every draw
 */
const COLOR_LINE_HAND1 = 'rgba(38, 63, 50, 0.92)';    // Forest Green
const COLOR_LINE_HAND2 = 'rgba(196, 119, 92, 0.92)';   // Terracotta
const COLOR_BOUNDS_HAND1 = 'rgba(38, 63, 50, 0.8)';
const COLOR_BOUNDS_HAND2 = 'rgba(196, 119, 92, 0.8)';
const COLOR_TIP = '#A65338';                           // Rust
const COLOR_WRIST = '#C4775C';                         // Terracotta
const COLOR_JOINT = '#A8B49A';                         // Sage
const COLOR_BORDER = '#FFFDF8';                        // Soft Ivory
const COLOR_TAG_BG = '#1C3027';                        // Deep Forest
const COLOR_TAG_TEXT = '#F8F5ED';                      // Warm Ivory
const FONT_TAG = '600 11px "DM Sans", system-ui, -apple-system, sans-serif';
const DASH_PATTERN = [5, 5];
const TIP_INDICES = new Set([4, 8, 12, 16, 20]);

/**
 * HandLandmarkCanvas — Vintage Botanical Style
 * - Renders 21 skeletal joints and bone connections using earthy forest green, terracotta, sage, and rust.
 * - Optimized: Eliminates continuous requestAnimationFrame loop in Live Tracking mode.
 * - Renders on-demand when live landmark frames arrive.
 * - Uses continuous loop only in Simulation mode for smooth wave/gesture movement.
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

  // Render on-demand in live mode, or via RAF in simulation mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper: draw live MediaPipe tracking frame
    const drawLiveFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!showSkeleton || !liveLandmarks || liveLandmarks.length === 0) {
        return;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      for (let handIdx = 0; handIdx < liveLandmarks.length; handIdx++) {
        const handPoints = liveLandmarks[handIdx];
        if (!handPoints || handPoints.length === 0) continue;

        // Convert normalized coordinates to mirrored pixel space
        // Note: x is mirrored (1 - pt.x) to match video scaleX(-1) preview!
        const pixelPoints = new Array(handPoints.length);
        let minX = canvasWidth;
        let maxX = 0;
        let minY = canvasHeight;
        let maxY = 0;

        for (let idx = 0; idx < handPoints.length; idx++) {
          const pt = handPoints[idx];
          const px = (1 - pt.x) * canvasWidth;
          const py = pt.y * canvasHeight;

          pixelPoints[idx] = { x: px, y: py };

          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }

        ctx.save();

        // 1. Draw Skeleton Lines
        ctx.strokeStyle = handIdx === 0 ? COLOR_LINE_HAND1 : COLOR_LINE_HAND2;
        ctx.lineWidth = 3.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        for (let i = 0; i < HAND_CONNECTIONS.length; i++) {
          const [startIdx, endIdx] = HAND_CONNECTIONS[i];
          const p1 = pixelPoints[startIdx];
          const p2 = pixelPoints[endIdx];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();

        // 2. Draw Joints (Earthy Botanical)
        for (let idx = 0; idx < pixelPoints.length; idx++) {
          const pt = pixelPoints[idx];
          const isTip = TIP_INDICES.has(idx);
          const isWrist = idx === 0;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isWrist ? 6.5 : isTip ? 5.5 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isTip ? COLOR_TIP : isWrist ? COLOR_WRIST : COLOR_JOINT;
          ctx.fill();

          ctx.strokeStyle = COLOR_BORDER;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // 3. Draw Bounding Box around detected hand
        const pad = 14;
        minX = Math.max(0, minX - pad);
        maxX = Math.min(canvasWidth, maxX + pad);
        minY = Math.max(0, minY - pad);
        maxY = Math.min(canvasHeight, maxY + pad);

        ctx.strokeStyle = handIdx === 0 ? COLOR_BOUNDS_HAND1 : COLOR_BOUNDS_HAND2;
        ctx.lineWidth = 1.5;
        ctx.setLineDash(DASH_PATTERN);
        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
        ctx.setLineDash([]);

        // 4. Header tag over bounding box
        const tag = handIdx === 0
          ? `${gestureLabel || 'Hand'} • ${Math.round(confidence)}%`
          : `Hand 2 • ${Math.round(confidence - 1)}%`;

        ctx.font = FONT_TAG;
        const textWidth = ctx.measureText(tag).width + 16;
        ctx.fillStyle = COLOR_TAG_BG;
        ctx.fillRect(minX, Math.max(0, minY - 24), textWidth, 22);

        ctx.fillStyle = COLOR_TAG_TEXT;
        ctx.fillText(tag, minX + 8, Math.max(14, minY - 8));

        ctx.restore();
      }
    };

    // Case 1: LIVE MODE — Render once per new frame (no continuous 60fps loop)
    if (isLiveMode) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      drawLiveFrame();
      return;
    }

    // Case 2: SIMULATION MODE — Run continuous animation for gesture motion
    let isRunning = true;
    const simRenderLoop = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (showSkeleton) {
        timeRef.current += 0.04;
        const primaryLandmarks = generateHandLandmarks(activeGesture, timeRef.current, false);
        drawLandmarks(ctx, primaryLandmarks, {
          jointColor: COLOR_JOINT,
          tipColor: COLOR_TIP,
          lineColor: COLOR_LINE_HAND1,
          label: `Simulated: ${Math.round(confidence)}%`
        });

        if (isTwoHanded) {
          const secondaryLandmarks = generateHandLandmarks(activeGesture, timeRef.current + 0.5, true);
          drawLandmarks(ctx, secondaryLandmarks, {
            jointColor: COLOR_WRIST,
            tipColor: COLOR_TIP,
            lineColor: COLOR_LINE_HAND2,
            label: 'Hand L (Sim)'
          });
        }
      }

      if (isRunning) {
        animFrameRef.current = requestAnimationFrame(simRenderLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(simRenderLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [liveLandmarks, activeGesture, gestureLabel, confidence, isTwoHanded, showSkeleton, isLiveMode, width, height]);

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
