<script setup>

</script>

<template>
  <article>
    <p>Man this is an exciting time to be alive huh? Totally not doomy and gloomy and things going to shit, no sir!</p>

    <p>2025 has been a great year for me personally as I've finally started figuring things out in my late 20s (I still have a long way to go).</p>

    <p>The sole reason I made this Tumblr account (sorry I'm not editing that out) was to post my progress for my game. I haven't talked about it yet, but its theme will be <strong>Sustainability</strong>. In an Animal Crossing meets Minecraft meets Dwarf Fortress kind of way, you'll be tasked with taking care of various villagers that will be invited to your island as you progress—assigning them tasks, work hours, and having fun with them through special Quests, based almost solely on their needs and your morals.</p>

    <p>So my previous posts were about me learning some basic 3D art. I did 2 really basic models with some questionable texturing and never posted again. It's true I almost never worked on anything since. I've tried making a character (which is very wrong), but my main flaw while working and designing this game is <strong>prioritizing</strong>. I've even made a plan in my notebook and a Trello, but I still tend to wander off to anything but what I need to do for my prototype.</p>

    <p>For instance, this post will be about the tool I created these holidays now that I could have some time off work. It's nothing novel and it's based on <a href="https://www.youtube.com/watch?v=jEWFSv3ivTg" target="_blank">jess::codes' video about the Dual Grid System</a> as well as <a href="https://www.youtube.com/watch?v=0bcZb-SopDw" target="_blank">Oskar Stålberg's talk at the Sweden Game Conference</a>.</p>

    <h2>So what is a Dual Grid system?</h2>

    <p>Well for starters, we'll have to talk about one Grid!</p>

    <p>Grids have always been part of games, for centuries! Think of chess, think of Go, think of Tic-Tac-Toe! There have always been games where they needed a defining grid, which would dictate the bounds of a game and its main logic. For instance, in chess it dictates that a pawn in a tile can only move one cell up on the x,y plane. That is exactly what video games use it for! They have this grid that dictates the logic of the world.</p>

    <p>In a video game like Minecraft for example, the Grid, which extends to all 3 axes (x,y,z), is used for mob pathfinding, for water flow, to even check what a block is, if it's mineable, etc. Which is why in my tool I call it <strong>World Grid</strong> (although based on what I wrote, Logic Grid would be a more apt name, but alas).</p>

    <p>Just like Minecraft, you can handle the world's visuals in that Grid as well. Just spawn a tile based on the tile type you have ordained, either by a painting tool you wrote or procedural generation, but you do end up with a very blocky looking game. Which is fine if that is what you want.</p>

    <p>What I wanted for my game though is <strong>Curves</strong>. I want them, I love them, I need them. As I design an island either in the Game Engine or as a player at runtime, I want to see my tiles turning into beautiful corners and terraform my island with convexes and concaves.</p>

    <p>To do that in a one grid system, you would have to check all the nearby neighbours of the cell you are checking, and change all of them appropriately. So for each tile type you'd have to check all 8 neighbours which is 2⁸ = 256 different tiles! That's a lot! Of course a lot of cases overlap and you can end up with 47 tiles! That is still a significant amount, especially if you are making a 2D game—imagine having to draw a water flipbook animation and having to do an animation for all 47 tiles.</p>

    <div class="image-placeholder">

      <img src="../../../public/combinations_blob.png" height="256" width="256"/>
    </div>

    <h2>So this is where the Dual Grid system comes in.</h2>

    <p>The main idea is that instead of using a single grid to handle both game logic and visuals, you split those responsibilities across <strong>two overlapping grids</strong>, each with a clearly defined role.</p>

    <p>The first grid is the one I already mentioned: the <strong>World Grid</strong>. This grid is authoritative. It dictates what exists in the world and how systems interact with it. Pathfinding, simulation, interactions, terrain types—all of that is driven by this grid. Each cell is discrete and unambiguous: land is land, water is water.</p>

    <p>This grid could also be used for visuals, but as discussed earlier, doing so quickly leads to very blocky results unless you introduce a large amount of tile variants and neighbor-checking logic.</p>

    <p>The second grid is the <strong>Visual Grid</strong>.</p>

    <p>This grid exists purely to decide how the world should look. It does not affect gameplay or simulation. The important detail is that the visual grid is <strong>offset</strong> relative to the world grid. Instead of aligning directly with logic cells, visual tiles sit at the <strong>corners</strong> of the world grid cells.</p>

    <p>Each visual tile therefore evaluates the four surrounding world cells and determines which mesh or sprite to display based on their combination.</p>

    <p>Because each cell can only be in two states (e.g. land or water), this results in 2⁴ = <strong>16 possible configurations</strong>. These configurations naturally map to full tiles, edges, convex corners, and concave corners. With just these 16 tiles, it becomes possible to render smooth coastlines and curved terrain while keeping the underlying logic grid fully discrete.</p>

    <div class="image-placeholder">

      <img src="../../../public/combinations_dualgrid.png" height="256" width="256"/></div>

    <h2>Calculating Configurations</h2>

    <p>These configurations are really easy to calculate. Each visual tile samples 4 corners of the world grid where each corner is either filled or empty. That gives us a nice binary state where from left to right:</p>

    <p><span class="code-inline">config = BL×1 + BR×2 + TL×4 + TR×8</span></p>

    <p>So we end up with this really simple table!</p>

    <table>
      <thead>
      <tr>
        <th>Config</th>
        <th>Binary</th>
        <th>Corners Filled</th>
        <th>Tile Type</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>0</td>
        <td>0000</td>
        <td>-</td>
        <td>Empty</td>
      </tr>
      <tr>
        <td>1</td>
        <td>0001</td>
        <td>BL</td>
        <td>Corner</td>
      </tr>
      <tr>
        <td>2</td>
        <td>0010</td>
        <td>BR</td>
        <td>Corner</td>
      </tr>
      <tr>
        <td>3</td>
        <td>0011</td>
        <td>BL + BR</td>
        <td>Edge</td>
      </tr>
      <tr>
        <td>4</td>
        <td>0100</td>
        <td>TL</td>
        <td>Corner</td>
      </tr>
      <tr>
        <td>5</td>
        <td>0101</td>
        <td>BL + TL</td>
        <td>Edge</td>
      </tr>
      <tr>
        <td>6</td>
        <td>0110</td>
        <td>BR + TL</td>
        <td>Diagonal</td>
      </tr>
      <tr>
        <td>7</td>
        <td>0111</td>
        <td>BL + BR + TL</td>
        <td>Inner Corner</td>
      </tr>
      <tr>
        <td>8</td>
        <td>1000</td>
        <td>TR</td>
        <td>Corner</td>
      </tr>
      <tr>
        <td>9</td>
        <td>1001</td>
        <td>BL + TR</td>
        <td>Diagonal</td>
      </tr>
      <tr>
        <td>10</td>
        <td>1010</td>
        <td>BR + TR</td>
        <td>Edge</td>
      </tr>
      <tr>
        <td>11</td>
        <td>1011</td>
        <td>BL + BR + TR</td>
        <td>Inner Corner</td>
      </tr>
      <tr>
        <td>12</td>
        <td>1100</td>
        <td>TL + TR</td>
        <td>Edge</td>
      </tr>
      <tr>
        <td>13</td>
        <td>1101</td>
        <td>BL + TL + TR</td>
        <td>Inner Corner</td>
      </tr>
      <tr>
        <td>14</td>
        <td>1110</td>
        <td>BR + TL + TR</td>
        <td>Inner Corner</td>
      </tr>
      <tr>
        <td>15</td>
        <td>1111</td>
        <td>all</td>
        <td>Fill</td>
      </tr>
      </tbody>
    </table>

    <p>This way depending on the tile type you end up with, you can generate the appropriate sprite or mesh!</p>

    <h2>But it doesn't stop here!</h2>

    <div class="image-placeholder">

      <img src="../../../public/combinations_dualgrid.png" height="256" width="256"/></div>

    <p>The corner is basically the same sprite rotated, right?</p>

    <p>This means we can trim our assets to even less than 16—we just need as many as the tile types we have! In our current case <strong>5</strong> (discounting the Empty tile type)!</p>

    <div class="image-placeholder">
      <img src="../../../public/final_tiles.png" height="160" width="256"/>
    </div>

    <p>Another major benefit is how clean terrain editing becomes. When a world tile changes (for example, water becoming land), the logic grid updates once, and only the nearby visual tiles need to be recalculated. No manual correction of neighbors, no cascading special cases. The visuals adapt automatically.</p>

    <p>Overall, the dual grid allows the logic side of the game to remain simple and robust, while giving the visual layer enough information to produce organic-looking results. It strikes a good balance between simulation-friendly design and the softer, more natural aesthetic I want for the game.</p>

    <div class="image-placeholder">
      <img src="../../../public/Unity_qrcQrlr29l.gif" height="774" width="1195"/></div>
    <hr>

    <p>You can find the source of this tool here!</p>

    <a href="https://github.com/NickChalvatzakis/WorldGenerationTool" target="_blank" class="github-link">View on GitHub</a>
  </article>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

h1 {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8em;
  color: #34495e;
  margin-top: 40px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #243c4d;
}

p {
  margin-bottom: 15px;
  font-size: 1.05em;
}

strong {
  color: #2c3e50;
  font-weight: 600;
}

a {
  color: #315267;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.image-placeholder {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 30px 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #a0cdf5;
  color: white;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #e8f4f8;
}

.code-inline {
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #e74c3c;
}

.github-link {
  display: inline-block;
  margin-top: 20px;
  color: white;
  text-decoration: none;
}

hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 40px 0;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  table {
    font-size: 0.9em;
  }

  th, td {
    padding: 8px 10px;
  }
}
</style>



