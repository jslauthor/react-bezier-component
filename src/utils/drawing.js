import React from 'react';
import range from 'lodash/range';
import reverse from 'lodash/reverse';
import Point from 'point-geometry';
import {spring} from 'react-motion';
import Bezier from 'bezier-js';

export function getHandlePoints(T1, T2, p1, p2, width, height) {
  let x1 = bezierInterpolation(T1, 0, p1.x, p2.x, width);
  let y1 = bezierInterpolation(T1, height, p1.y, p2.y, 0);
  let x2 = bezierInterpolation(T2, 0, p1.x, p2.x, width);
  let y2 = bezierInterpolation(T2, height, p1.y, p2.y, 0);
  return { p1: new Point(x1, y1), p2: new Point(x2, y2) }
}

export function controlPointInterpolation(p0x, p0y,
                                          u, p1x, p1y,
                                          v, p2x, p2y,
                                          p3x, p3y)
{
  let a=0, b=0, c=0, d=0, det=0;
  const q1 = new Point(), q2 = new Point(), p1 = new Point(),
        p2 = new Point(), p3 = new Point(), p4 = new Point();

  if ( (u<=0.0) || (u>=1.0) || (v<=0.0) || (v>=1.0) || (u>=v) ) {
    return {p1, p2, p3, p4}; /* failure */
  }

  a = 3*(1-u)*(1-u)*u; b = 3*(1-u)*u*u;
  c = 3*(1-v)*(1-v)*v; d = 3*(1-v)*v*v;
  det = a*d - b*c;
  /* unnecessary, but just in case... */
  if (det == 0.0) return {p1, p2, p3, p4}; /* failure */

  p1.x = p0x; p1.y = p0y;
  p4.x = p3x; p4.y = p3y;

  q1.x = p1x - ( (1-u)*(1-u)*(1-u)*p0x + u*u*u*p3x );
  q1.y = p1y - ( (1-u)*(1-u)*(1-u)*p0y + u*u*u*p3y );

  q2.x = p2x - ( (1-v)*(1-v)*(1-v)*p0x + v*v*v*p3x );
  q2.y = p2y - ( (1-v)*(1-v)*(1-v)*p0y + v*v*v*p3y );

  p2.x = d*q1.x - b*q2.x;
  p2.y = d*q1.y - b*q2.y;
  p2.x /= det;
  p2.y /= det;

  p3.x = (-c)*q1.x + a*q2.x;
  p3.y = (-c)*q1.y + a*q2.y;
  p3.x /= det;
  p3.y /= det;

  return {p1, p2, p3, p4, q1, q2};
}

export function bezierInterpolation(t, a, b, c, d) {
    const t2 = t * t;
    const t3 = t2 * t;
    return a + (-a * 3 + t * (3 * a - a * t)) * t
      + (3 * b + t * (-6 * b + b * 3 * t)) * t
      + (c * 3 - c * 3 * t) * t2
      + d * t3;
}

export function interpolatedLines(p) {
  const center = p.p1.add(p.p2).div(2);
  const angle = Math.round((p.p1.angleTo(p.p2)+Math.PI/2) * (180/Math.PI));
  return {
    p1x: spring(p.p1.x), p1y: spring(p.p1.y), p2x: spring(p.p2.x), p2y: spring(p.p2.y),
    cp1x: spring(center.x), cp1y: spring(center.y), angle: angle
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
