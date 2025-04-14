Title: fk for a 3 dof planar robot
Date: 2025-04-13
Category: manipulation
Tags: robotics, manipulation
Slug: 3-dof-planar-rrr-fk
Authors: james gadoury 

This page displays an interactive 3-DOF planar robot manipulator. Use the sliders below the canvas to adjust the joint angles (in degrees) and link lengths (in pixels). The robot will update dynamically based on your input.


<canvas id="robotCanvas" width="600" height="600" style="border:1px solid #ccc; background-color:#f9f9f9;"></canvas>

<!-- Controls for joint angles -->
<div class="control-container">
  <h2>Joint Angles (Degrees)</h2>
  <div>
    <label for="q1">q1:</label>
    <input type="range" id="q1" class="slider" min="-180" max="180" value="0">
    <span id="q1Val">0°</span>
  </div>
  <div>
    <label for="q2">q2:</label>
    <input type="range" id="q2" class="slider" min="-180" max="180" value="0">
    <span id="q2Val">0°</span>
  </div>
  <div>
    <label for="q3">q3:</label>
    <input type="range" id="q3" class="slider" min="-180" max="180" value="0">
    <span id="q3Val">0°</span>
  </div>
</div>

<!-- Controls for link lengths -->
<div class="control-container">
  <h2>Link Lengths (Pixels)</h2>
  <div>
    <label for="l1">l1:</label>
    <input type="range" id="l1" class="slider" min="10" max="200" value="100">
    <span id="l1Val">100</span>
  </div>
  <div>
    <label for="l2">l2:</label>
    <input type="range" id="l2" class="slider" min="10" max="200" value="100">
    <span id="l2Val">100</span>
  </div>
  <div>
    <label for="l3">l3:</label>
    <input type="range" id="l3" class="slider" min="10" max="200" value="100">
    <span id="l3Val">100</span>
  </div>
</div>

<script type="text/javascript" src="./js/planar_rrr.js"></script>
