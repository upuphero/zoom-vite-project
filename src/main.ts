// src/main.ts
import * as d3 from "d3";

window.onload = () => {
  const svg = d3
    .select("#svg-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 100 100")
    .attr("preserveAspectRatio", "none");

  // Create the horizontal and vertical lines
  svg
    .append("line")
    .attr("x1", "0")
    .attr("y1", "50")
    .attr("x2", "100")
    .attr("y2", "50")
    .attr("stroke", "black")
    .attr("stroke-width", "0.1");

  svg
    .append("line")
    .attr("x1", "50")
    .attr("y1", "0")
    .attr("x2", "50")
    .attr("y2", "100")
    .attr("stroke", "black")
    .attr("stroke-width", "0.1");

  // Define the quadrants with labels and viewbox coordinates
  const quadrants = [
    { label: "II", x: 75, y: 25, viewBox: "0 0 50 50" },
    { label: "I", x: 25, y: 25, viewBox: "50 0 50 50" },
    { label: "III", x: 25, y: 75, viewBox: "0 50 50 50" },
    { label: "IV", x: 75, y: 75, viewBox: "50 50 50 50" },
  ];

  // Add rectangles for each quadrant
  quadrants.forEach((quadrant, i) => {
    svg
      .append("rect")
      .attr("x", i % 2 === 1 ? 50 : 0) // Corrected x position based on index
      .attr("y", i >= 2 ? 50 : 0) // Corrected y position based on index
      .attr("width", "50")
      .attr("height", "50")
      .style("fill", "none")
      .style("pointer-events", "all") // Make sure the rectangle is clickable
      .on("click", () => {
        svg.transition().duration(750).attr("viewBox", quadrant.viewBox);
      });
  });

  // Add labels on top of the rectangles
  quadrants.forEach((quadrant) => {
    svg
      .append("text")
      .attr("x", quadrant.x)
      .attr("y", quadrant.y)
      .attr("font-family", "Verdana")
      .attr("font-size", "1")
      .attr("fill", "blue")
      .text(quadrant.label);
  });
};
