import React from 'react';
import range from 'lodash/range';
import reverse from 'lodash/reverse';
import Point from 'point-geometry';

export function calculateCoordinates(width, height, eq) {
  const p1 = new Point(width*eq[0], height-(height*eq[1]));
  const p2 = new Point(width*eq[2], height-(height*eq[3]));
  return {p1, p2};
}

export function transform(width, height, eq) {
  const points = calculateCoordinates(width, height, eq);
  const p1 = `${points.p1.x},${points.p1.y}`;
  const p2 = `${points.p2.x},${points.p2.y}`;
  return `M${width},0 C${p2} ${p1} 0,${height}`;
}

export function createBorder(direction = 1) {
  let cumulative = 0;
  const sort = direction > 0 ? (r) => r : (r) => reverse(r);
  return sort(range(5)).map((i) => {
    const height = 15 * ((5-i)/5);
    const rect = <rect key={`b${i}${Math.random()}`} y={cumulative} width="100%" height={height}
                className="bezier-tool_border-bg" />
    cumulative += height + 2;
    return rect;
  });
}
