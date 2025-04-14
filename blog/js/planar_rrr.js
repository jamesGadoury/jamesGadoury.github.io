document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('robotCanvas');
  const ctx = canvas.getContext('2d');
  const q1 = document.getElementById('q1'),
        q2 = document.getElementById('q2'),
        q3 = document.getElementById('q3'),
        l1 = document.getElementById('l1'),
        l2 = document.getElementById('l2'),
        l3 = document.getElementById('l3');

  function drawRobot() {
    // Clear the canvas for redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parse input values; convert angles from degrees to radians.
    const angle1 = parseFloat(q1.value) * Math.PI / 180,
          angle2 = parseFloat(q2.value) * Math.PI / 180,
          angle3 = parseFloat(q3.value) * Math.PI / 180,
          len1   = parseFloat(l1.value),
          len2   = parseFloat(l2.value),
          len3   = parseFloat(l3.value);

    // Define the robot's base:
    // With a 400×400 canvas and default link lengths, a left margin of 50 places the base so
    // the robot nearly fills the canvas in its default configuration.
    const margin = 50;
    const originX = margin;
    const originY = canvas.height / 2;
    let x = originX, y = originY, currentAngle = 0;

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#007acc';
    ctx.beginPath();
    ctx.moveTo(x, y);

    // First link
    currentAngle += angle1;
    const x1 = x + len1 * Math.cos(currentAngle),
          y1 = y + len1 * Math.sin(currentAngle);
    ctx.lineTo(x1, y1);

    // Second link
    currentAngle += angle2;
    const x2 = x1 + len2 * Math.cos(currentAngle),
          y2 = y1 + len2 * Math.sin(currentAngle);
    ctx.lineTo(x2, y2);

    // Third link
    currentAngle += angle3;
    const x3 = x2 + len3 * Math.cos(currentAngle),
          y3 = y2 + len3 * Math.sin(currentAngle);
    ctx.lineTo(x3, y3);
    ctx.stroke();

    // Draw joints as small red circles
    [[originX, originY], [x1, y1], [x2, y2], [x3, y3]].forEach(function(point) {
      ctx.beginPath();
      ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    });
  }

  // Attach the input event listener to all number fields
  [q1, q2, q3, l1, l2, l3].forEach(field => {
    field.addEventListener('input', drawRobot);
  });

  // Initial drawing
  drawRobot();
});

