Title: fk for a 3 dof planar robot
Date: 2025-04-13
Category: manipulation
Tags: robotics, manipulation
Slug: 3-dof-planar-rrr-fk
Authors: james gadoury 

Enter the joint angles (in °) and link lengths (in px) in the fields on the left.  
Link lengths are constrained from 45 to 150 px. The drawing will automatically scale so that  
the entire robot (its task space) always fits within the canvas.

<style>
  .robot-container { 
    display: flex; 
    align-items: flex-start; 
    margin: 0; 
    padding: 0; 
  }
  .controls { 
    width: 180px; 
    padding: 5px; 
    font-size: 0.9em; 
    line-height: 1.2em; 
  }
  .controls div { 
    margin-bottom: 6px; 
  }
  .canvas-container { 
    flex-grow: 1; 
    display: flex; 
    justify-content: center; 
    padding: 5px; 
  }
  input[type="number"] { 
    width: 60px; 
    font-size: 0.9em; 
  }
</style>

<div class="robot-container">
  <div class="controls">
    <div><strong>Joint Angles (°)</strong></div>
    <div>q1: <input type="number" id="q1" value="0" min="-180" max="180"></div>
    <div>q2: <input type="number" id="q2" value="0" min="-180" max="180"></div>
    <div>q3: <input type="number" id="q3" value="0" min="-180" max="180"></div>
    <div><strong>Link Lengths (px)</strong></div>
    <div>l1: <input type="number" id="l1" value="100" min="45" max="150"></div>
    <div>l2: <input type="number" id="l2" value="100" min="45" max="150"></div>
    <div>l3: <input type="number" id="l3" value="100" min="45" max="150"></div>
  </div>
  <div class="canvas-container">
    <!-- Canvas size is fixed (e.g., 400×400) -->
    <canvas id="robotCanvas" width="400" height="400" style="border:1px solid #ccc; background:#f9f9f9;"></canvas>
  </div>
</div>

<!-- Reference to the external JavaScript file -->
<script type="text/javascript" src="./js/planar_rrr.js"></script>
