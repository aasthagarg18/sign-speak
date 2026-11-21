/**
 * MediaPipe-compatible Hand Landmark Simulator & Canvas Renderer
 * Renders 21 skeletal joints, bone connections, depth shading, and bounding boxes.
 */

export const HAND_CONNECTIONS = [
  // Palm base
  [0, 1], [0, 5], [5, 9], [9, 13], [13, 17], [0, 17],
  // Thumb
  [1, 2], [2, 3], [3, 4],
  // Index
  [5, 6], [6, 7], [7, 8],
  // Middle
  [9, 10], [10, 11], [11, 12],
  // Ring
  [13, 14], [14, 15], [15, 16],
  // Pinky
  [17, 18], [18, 19], [19, 20]
];

// Generates procedural landmark set for a given gesture type and time offset
export function generateHandLandmarks(gestureType, t = 0, isSecondHand = false) {
  const wobbleX = Math.sin(t * 2) * 4;
  const wobbleY = Math.cos(t * 1.5) * 3;

  // Base center point
  const centerX = (isSecondHand ? 220 : 420) + wobbleX;
  const centerY = 270 + wobbleY;

  // Default neutral open hand landmark template relative to center
  let points = [
    { x: 0, y: 100 },   // 0: Wrist
    // Thumb
    { x: -35, y: 70 },  // 1
    { x: -60, y: 40 },  // 2
    { x: -75, y: 10 },  // 3
    { x: -85, y: -20 }, // 4: Thumb Tip
    // Index
    { x: -30, y: -10 }, // 5: MCP
    { x: -35, y: -55 }, // 6: PIP
    { x: -38, y: -90 }, // 7: DIP
    { x: -40, y: -120 },// 8: Index Tip
    // Middle
    { x: 0, y: -15 },   // 9: MCP
    { x: 0, y: -65 },   // 10: PIP
    { x: 0, y: -105 },  // 11: DIP
    { x: 0, y: -135 },  // 12: Middle Tip
    // Ring
    { x: 28, y: -10 },  // 13: MCP
    { x: 32, y: -55 },  // 14: PIP
    { x: 35, y: -90 },  // 15: DIP
    { x: 38, y: -115 }, // 16: Ring Tip
    // Pinky
    { x: 55, y: 0 },    // 17: MCP
    { x: 65, y: -35 },  // 18: PIP
    { x: 72, y: -65 },  // 19: DIP
    { x: 78, y: -90 }   // 20: Pinky Tip
  ];

  // Modify coordinates based on gesture type
  if (gestureType === 'namaste') {
    // Both hands pressed vertically in center
    const tilt = isSecondHand ? 15 : -15;
    const shiftX = isSecondHand ? -30 : 30;
    points = points.map(p => ({
      x: p.x * 0.7 + shiftX + (p.y * 0.1 * (isSecondHand ? -1 : 1)),
      y: p.y * 0.85 - 20
    }));
  } else if (gestureType === 'fist' || gestureType === 'yes') {
    // Curled fingers
    points[4] = { x: -30, y: 20 };
    points[6] = { x: -25, y: 15 }; points[7] = { x: -22, y: 35 }; points[8] = { x: -20, y: 45 };
    points[10] = { x: 0, y: 15 }; points[11] = { x: 0, y: 35 }; points[12] = { x: 0, y: 45 };
    points[14] = { x: 22, y: 15 }; points[15] = { x: 20, y: 35 }; points[16] = { x: 18, y: 45 };
    points[18] = { x: 42, y: 20 }; points[19] = { x: 38, y: 35 }; points[20] = { x: 35, y: 45 };
  } else if (gestureType === 'thumbs-up' || gestureType === 'help') {
    // Thumb pointing up, other fingers folded
    points[1] = { x: -20, y: 40 }; points[2] = { x: -25, y: 10 };
    points[3] = { x: -25, y: -30 }; points[4] = { x: -25, y: -70 };
    points[6] = { x: -15, y: 15 }; points[7] = { x: -12, y: 35 }; points[8] = { x: -10, y: 45 };
    points[10] = { x: 5, y: 15 }; points[11] = { x: 5, y: 35 }; points[12] = { x: 5, y: 45 };
    points[14] = { x: 20, y: 15 }; points[15] = { x: 20, y: 35 }; points[16] = { x: 20, y: 45 };
    points[18] = { x: 35, y: 20 }; points[19] = { x: 35, y: 35 }; points[20] = { x: 35, y: 45 };
  } else if (gestureType === 'peace' || gestureType === 'isl-v' || gestureType === 'count-2') {
    // Index & middle extended, others folded
    points[4] = { x: -25, y: 25 };
    points[8] = { x: -45, y: -130 }; // spread index
    points[12] = { x: 15, y: -130 };  // spread middle
    points[14] = { x: 20, y: 15 }; points[15] = { x: 20, y: 35 }; points[16] = { x: 20, y: 45 };
    points[18] = { x: 35, y: 20 }; points[19] = { x: 35, y: 35 }; points[20] = { x: 35, y: 45 };
  } else if (gestureType === 'pointing' || gestureType === 'count-1' || gestureType === 'where') {
    // Only index extended
    points[4] = { x: -25, y: 25 };
    points[8] = { x: -25, y: -140 };
    points[10] = { x: 5, y: 15 }; points[11] = { x: 5, y: 35 }; points[12] = { x: 5, y: 45 };
    points[14] = { x: 20, y: 15 }; points[15] = { x: 20, y: 35 }; points[16] = { x: 20, y: 45 };
    points[18] = { x: 35, y: 20 }; points[19] = { x: 35, y: 35 }; points[20] = { x: 35, y: 45 };
  }

  // Convert to absolute canvas coordinates
  return points.map((p, idx) => ({
    id: idx,
    x: Math.round(centerX + (isSecondHand ? -p.x : p.x)),
    y: Math.round(centerY + p.y),
    z: Math.sin(t + idx * 0.2) * 10
  }));
}

/**
 * Draw hand landmarks and connecting skeleton onto canvas
 */
export function drawLandmarks(ctx, landmarks, options = {}) {
  const {
    jointColor = '#06B6D4',
    tipColor = '#10B981',
    lineColor = 'rgba(79, 70, 229, 0.85)',
    lineWidth = 2.5,
    jointRadius = 4,
    showBoundingBox = true,
    label = ''
  } = options;

  if (!landmarks || landmarks.length < 21) return;

  ctx.save();

  // 1. Draw connection bones
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
    const p1 = landmarks[startIdx];
    const p2 = landmarks[endIdx];
    if (p1 && p2) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  });

  // 2. Draw Joints
  landmarks.forEach((pt, idx) => {
    const isTip = [4, 8, 12, 16, 20].includes(idx);
    const isWrist = idx === 0;

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, isWrist ? jointRadius + 2 : isTip ? jointRadius + 1.5 : jointRadius, 0, Math.PI * 2);
    ctx.fillStyle = isTip ? tipColor : isWrist ? '#F59E0B' : jointColor;
    ctx.fill();

    // Outer glow ring
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  // 3. Optional Bounding Box with Label
  if (showBoundingBox) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    landmarks.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const padding = 16;
    minX -= padding; maxX += padding;
    minY -= padding; maxY += padding;

    // Dashed glowing bounding rectangle
    ctx.save();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);

    // Label tag
    if (label) {
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(minX, minY - 24, ctx.measureText(label).width + 16, 22);
      ctx.fillStyle = '#38BDF8';
      ctx.font = '600 11px system-ui, -apple-system, sans-serif';
      ctx.fillText(label, minX + 8, minY - 8);
    }
    ctx.restore();
  }

  ctx.restore();
}
