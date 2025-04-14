document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the canvas and its drawing context
  const canvas = document.getElementById('robotCanvas');
  const ctx = canvas.getContext('2d');

  // Retrieve sliders and display spans for angles and lengths
  const q1Slider = document.getElementById('q1'),
        q2Slider = document.getElementById('q2'),
        q3Slider = document.getElementById('q3'),
        l1Slider = document.getElementById('l1'),
        l2Slider = document.getElementById('l2'),
        l3Slider = document.getElementById('l3');

  const q1Val = document.getElementById('q1Val'),
        q2Val = document.getElementById('q2Val'),
        q3Val = document.getElementById('q3Val'),
        l1Val = document.getElementById('l1Val'),
        l2Val = document.getElementById('l2Val'),
        l3Val = document.getElementById('l3Val');

  // Function to draw the robot on the canvas
  function drawRobot() {
    // Clear the canvas for redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parse slider values and convert angles from degrees to radians
    const q1 = parseFloat(q1Slider.value) * Math.PI / 180;
    const q2 = parseFloat(q2Slider.value) * Math.PI / 180;
    const q3 = parseFloat(q3Slider.value) * Math.PI / 180;

    const l1 = parseFloat(l1Slider.value);
    const l2 = parseFloat(l2Slider.value);
    const l3 = parseFloat(l3Slider.value);

    // Update the displayed slider values
    q1Val.textContent = q1Slider.value + "°";
    q2Val.textContent = q2Slider.value + "°";
    q3Val.textContent = q3Slider.value + "°";
    l1Val.textContent = l1Slider.value;
    l2Val.textContent = l2Slider.value;
    l3Val.textContent = l3Slider.value;

    // Define the origin at the center of the canvas
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;

    // Set initial position and angle (starting from the base)
    let x = originX;
    let y = originY;
    let currentAngle = 0;

    // Set styling for drawing the robot arms
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#007acc';
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Draw first link: update angle by q1 then compute new position
    currentAngle += q1;
    let x1 = x + l1 * Math.cos(currentAngle);
    let y1 = y + l1 * Math.sin(currentAngle);
    ctx.lineTo(x1, y1);

    // Draw second link: update angle by q2 then compute new position
    currentAngle += q2;
    let x2 = x1 + l2 * Math.cos(currentAngle);
    let y2 = y1 + l2 * Math.sin(currentAngle);
    ctx.lineTo(x2, y2);

    // Draw third link: update angle by q3 then compute new position
    currentAngle += q3;
    let x3 = x2 + l3 * Math.cos(currentAngle);
    let y3 = y2 + l3 * Math.sin(currentAngle);
    ctx.lineTo(x3, y3);

    ctx.stroke();

    // Utility to draw joints as circles at given (cx, cy)
    function drawJoint(cx, cy) {
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    // Draw joints at the base and at the tip of each link
    drawJoint(originX, originY);
    drawJoint(x1, y1);
    drawJoint(x2, y2);
    drawJoint(x3, y3);
  }

  // Add event listeners to update the robot drawing whenever a slider is adjusted
  [q1Slider, q2Slider, q3Slider, l1Slider, l2Slider, l3Slider].forEach(slider => {
    slider.addEventListener('input', drawRobot);
  });

  // Initial drawing of the robot
  drawRobot();
});

