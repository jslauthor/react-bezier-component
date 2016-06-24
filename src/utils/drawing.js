import React from 'react';
import range from 'lodash/range';
import reverse from 'lodash/reverse';
import Point from 'point-geometry';
import {spring} from 'react-motion';
import Bezier from 'bezier-js';

export function animate(val, bool=true) {
  return bool === true ? spring(val) : val;
}

export function interpolatedLines(p, animated) {
  const center = p.p1.add(p.p2).div(2);
  const angle = Math.round((p.p1.angleTo(p.p2)+Math.PI/2) * (180/Math.PI));
  return {
    p1x: animate(p.p1.x, animated), p1y: animate(p.p1.y, animated),
    p2x: animate(p.p2.x, animated), p2y: animate(p.p2.y, animated),
    cp1x: animate(center.x, animated), cp1y: animate(center.y, animated),
    angle: angle
  }
}

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
