document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('robotCanvas');
  const ctx = canvas.getContext('2d');
  
  // References to input fields.
  const q1 = document.getElementById('q1'),
        q2 = document.getElementById('q2'),
        q3 = document.getElementById('q3'),
        l1 = document.getElementById('l1'),
        l2 = document.getElementById('l2'),
        l3 = document.getElementById('l3');

  function drawRobot() {
    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Read and convert input values.
    // Angles are in degrees; convert to radians.
    const angle1 = parseFloat(q1.value) * Math.PI / 180,
          angle2 = parseFloat(q2.value) * Math.PI / 180,
          angle3 = parseFloat(q3.value) * Math.PI / 180;
    const len1 = parseFloat(l1.value),
          len2 = parseFloat(l2.value),
          len3 = parseFloat(l3.value);

    // Compute joint positions in "robot space" with base at (0,0).
    // Using canvas-friendly coordinates (positive x to right, positive y downward).
    let points = [];
    let currentAngle = 0;
    let x = 0, y = 0;
    points.push({x: x, y: y}); // Base: p0

    currentAngle += angle1;
    x += len1 * Math.cos(currentAngle);
    y += len1 * Math.sin(currentAngle);
    points.push({x: x, y: y}); // p1

    currentAngle += angle2;
    x += len2 * Math.cos(currentAngle);
    y += len2 * Math.sin(currentAngle);
    points.push({x: x, y: y}); // p2

    currentAngle += angle3;
    x += len3 * Math.cos(currentAngle);
    y += len3 * Math.sin(currentAngle);
    points.push({x: x, y: y}); // p3

    // Determine the bounding box of the robot.
    let minX = points[0].x, maxX = points[0].x,
        minY = points[0].y, maxY = points[0].y;
    for (let i = 1; i < points.length; i++) {
      if(points[i].x < minX) minX = points[i].x;
      if(points[i].x > maxX) maxX = points[i].x;
      if(points[i].y < minY) minY = points[i].y;
      if(points[i].y > maxY) maxY = points[i].y;
    }

    // Set a margin inside the canvas.
    const margin = 20;
    const effectiveWidth = canvas.width - 2 * margin;
    const effectiveHeight = canvas.height - 2 * margin;

    // Compute scale factor to fit the bounding box in the canvas.
    // (If the robot is smaller than available space, scale factor will be 1.)
    let scaleX = effectiveWidth / (maxX - minX);
    let scaleY = effectiveHeight / (maxY - minY);
    let scale = Math.min(scaleX, scaleY);
    if (scale > 1) scale = 1;  // Do not upscale if already small.

    // Compute translation offsets so that the bounding box is centered.
    // After scaling, the left edge is at minX*scale; we want a left margin.
    let offsetX = margin + (effectiveWidth - (maxX - minX) * scale) / 2 - minX * scale;
    let offsetY = margin + (effectiveHeight - (maxY - minY) * scale) / 2 - minY * scale;

    // Draw the robot using the transformed coordinates.
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#007acc';
    ctx.beginPath();

    // Transform and move to the base.
    let pt = points[0];
    let xTrans = pt.x * scale + offsetX;
    let yTrans = pt.y * scale + offsetY;
    ctx.moveTo(xTrans, yTrans);

    // Draw links between joints.
    for (let i = 1; i < points.length; i++) {
      pt = points[i];
      xTrans = pt.x * scale + offsetX;
      yTrans = pt.y * scale + offsetY;
      ctx.lineTo(xTrans, yTrans);
    }
    ctx.stroke();

    // Draw joints as filled red circles.
    points.forEach(pt => {
      let xT = pt.x * scale + offsetX;
      let yT = pt.y * scale + offsetY;
      ctx.beginPath();
      ctx.arc(xT, yT, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    });
  }

  // Add event listener to all number inputs.
  [q1, q2, q3, l1, l2, l3].forEach(field => {
    field.addEventListener('input', drawRobot);
  });

  // Initial drawing.
  drawRobot();
});

