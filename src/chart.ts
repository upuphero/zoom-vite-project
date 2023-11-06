// src/chart.ts
import * as d3 from "d3";

export function createChart(
  data: [number, number][],
  width: number,
  height: number,
  radius: number
): SVGSVGElement {
  let currentTransform: [number, number, number] = [
    width / 2,
    height / 2,
    height,
  ]; // Correctly typed as a tuple

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height] as any);

  const g = svg.append("g");

  g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", ([x]) => x)
    .attr("cy", ([, y]) => y)
    .attr("r", radius)
    .attr("fill", (d, i) => d3.interpolateRainbow(i / data.length)); // Changed 360 to data.length for generality

  function transition() {
    const d = data[Math.floor(Math.random() * data.length)];
    const i = d3.interpolateZoom(currentTransform, [...d, radius * 2 + 1]);

    g.transition()
      .delay(250)
      .duration(i.duration)
      .attrTween(
        "transform",
        () => (t) =>
          transform((currentTransform = i(t) as [number, number, number]))
      ) // Type assertion for the interpolated value
      .on("end", transition);
  }

  function transform([x, y, r]: [number, number, number]): string {
    return `
      translate(${width / 2}, ${height / 2})
      scale(${height / r})
      translate(${-x}, ${-y})
    `;
  }

  svg.call(transition as any).node(); // Type assertion for the transition function
  return svg.node() as SVGSVGElement; // Type assertion for the SVG node
}
