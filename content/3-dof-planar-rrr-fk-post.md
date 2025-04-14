Title: fk for a 3 dof planar robot
Date: 2025-04-13
Category: manipulation
Tags: robotics, manipulation
Slug: 3-dof-planar-rrr-fk
Authors: james gadoury 

This page displays an interactive 3-DOF planar robot manipulator. Use the sliders below the canvas to adjust the joint angles (in degrees) and link lengths (in pixels). The robot will update dynamically based on your input.

<style>
  .robot-container { display: flex; align-items: flex-start; margin: 0; padding: 0; }
  .controls { width: 180px; padding: 5px; font-size: 0.9em; line-height: 1.2em; }
  .controls div { margin-bottom: 6px; }
  .canvas-container { flex-grow: 1; display: flex; justify-content: center; padding: 5px; }
  input[type="number"] { width: 60px; font-size: 0.9em; }
</style>

<div class="robot-container">
  <div class="controls">
    <div><strong>Joint Angles (°)</strong></div>
    <div>q1: <input type="number" id="q1" value="0" min="-180" max="180"></div>
    <div>q2: <input type="number" id="q2" value="0" min="-180" max="180"></div>
    <div>q3: <input type="number" id="q3" value="0" min="-180" max="180"></div>
    <div><strong>Link Lengths (px)</strong></div>
    <div>l1: <input type="number" id="l1" value="100" min="10" max="200"></div>
    <div>l2: <input type="number" id="l2" value="100" min="10" max="200"></div>
    <div>l3: <input type="number" id="l3" value="100" min="10" max="200"></div>
  </div>
  <div class="canvas-container">
    <canvas id="robotCanvas" width="600" height="600" style="border:1px solid #ccc; background:#f9f9f9;"></canvas>
  </div>
</div>

<script type="text/javascript" src="./js/planar_rrr.js"></script>
