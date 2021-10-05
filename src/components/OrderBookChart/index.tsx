import * as d3 from "d3";
import { OrderTotal } from "../../typings";

export function drawChart(data: OrderTotal[], svgElement: SVGSVGElement | null): () => void {
  // const prices = data.map(([price]) => price);
  if (!svgElement || !data.length) return () => null;
  update();

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const svgDimensions = svgElement.getBoundingClientRect();
  const width = svgDimensions.width - margin.right - margin.left;
  const height = svgDimensions.height - margin.top - margin.bottom;

  // Set range
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3
    .select("svg.chart-bid") // TODO - add asks
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.right})`);

  // Scale ranges to our data
  x.domain([d3.min(data, (d) => d[2]) as number, d3.max(data, (d) => d[2]) as number]);
  y.domain([d3.min(data, (d) => d[0]) as number, d3.max(data, (d) => d[0]) as number]); // TODO - fix typing so don't need to cast

  console.log(svgElement.children.length);

  svg
    .selectAll(".bar")
    .data(data)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("fill", "green")
          .attr("class", "bar")
          // TODO - change wehn adding dynamic widths
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .attr("x", (d) => x(d[2]))
          .attr("width", (d) => width - x(d[2]))
          .attr("y", (d) => y(d[0]))
          .attr("height", (d) => y(d[0])),
      (update) => update,
      (exit) => exit.remove()
    );

  function update() {
    d3.select("svg.chart-bid").selectAll("g").remove();
  }

  return update;

  // const height = 500 - margin.top - margin.bottom;
  // const width = 500 - margin.left - margin.right;

  // const svg = d3
  //   .select("svg.chart-bid")
  //   // .attr("viewBox", "0 0 100% 100%")
  //   .attr("width", width + margin.left + margin.right) // TODO - why are we subtracting then adding?? A: We need to height - margin for the bars
  //   .attr("height", height + margin.top + margin.bottom) // TODO - why are we subtracting then adding?? A: We need to height - margin for the bars
  //   .append("g")
  //   .attr("transform", `translate(${margin.left}, ${margin.top})`); // TODO - why?

  // const xRange = d3.scaleLinear().range([width, 0]);
  // const yRange = d3.scaleLinear().range([0, height]);
  //
  // // Scale the data to the domain
  // const xMin = d3.min(data, (d) => d[1]) as number;
  // const xMax = d3.max(data, (d) => d[1]) as number;
  // xRange.domain([xMin, xMax]);
  // yRange.domain([0, d3.max(data, (d) => d[0]) as number]);
  //
  // svg
  //   .selectAll("rect")
  //   .data(data)
  //   .join(
  //     (enter) => {
  //       // enter
  //       //   .append("rect")
  //       //   .attr("height", ([d]) => width - yDomain(d))
  //       //   .attr("width", (d, i) => {
  //       //     if (d[i + 1]) {
  //       //       return xDomain(d[1]) - xDomain(data[i + 1][2]);
  //       //     }
  //       //
  //       //     return xDomain.range()[1] - xDomain.range()[0] / data.length;
  //       //   })
  //       //   .attr("x", (d) => xDomain(d[1]))
  //       //   .attr("y", (d) => yDomain(d[0])),
  //       return (
  //         enter
  //           .append("rect")
  //           .attr("fill", "green")
  //           .attr("x", (d) => xRange(d[0]))
  //           .attr("width", (d) => {
  //             // console.log({ r: (width - xRange(d[0])) / width });
  //             return Math.abs(xRange(d[0]));
  //           })
  //           // .attr("width", (d) => width - xRange(d[0]))
  //           // .attr("y", (d) => yRange(d[1]))
  //           .attr("height", (d) => {
  //             // console.log({
  //             //   height,
  //             //   yranged2: yRange(d[1]),
  //             //   result: height - yRange(d[1]),
  //             //   test: Math.abs(yRange(d[1]) / height),
  //             // });
  //             // return Math.abs(yRange(d[1]) / height);
  //             console.log({ r: (height - yRange(d[1])) / height });
  //             return height - yRange(d[1]);
  //             // return height - yRange(d[1]);
  //           })
  //       );
  //     },
  //     (update) => update,
  //     (exit) => exit.remove()
  //   );

  // // TODO - fix types so casting isn't necessary
  // const min = d3.min(data, (d) => d[0]) as number;
  // const max = ((d3.max(data, (d) => d[0]) as number) + 1) as number;
  // const xDomain = d3.scaleLinear().domain([min, width]);
  //
  // const maxY = d3.max(data, (d) => d[2]) as number;
  // const yDomain = d3.scaleLinear().domain([0, maxY]);
  //
  // svg.attr("height", width);
  // svg.attr("width", width);
  // svg.attr("viewBox", "0 0 100% 100%");
  //
  // const bars = svg
  //   .selectAll("rect")
  //   .data(data)
  //   .attr("fill", "green")
  //   .join(
  //     (enter) =>
  //       enter
  //         .append("rect")
  //         .attr("height", ([d]) => width - yDomain(d))
  //         .attr("width", (d, i) => {
  //           if (d[i + 1]) {
  //             return xDomain(d[2]) - xDomain(data[i + 1][2]);
  //           }
  //
  //           return xDomain.range()[1] - xDomain.range()[0] / data.length;
  //         })
  //         .attr("x", (d) => xDomain(d[2]))
  //         .attr("y", (d) => yDomain(d[0])),
  //     (update) => update,
  //     (exit) => exit.remove()
  //   );

  // const circles = svg
  //   .selectAll("circle")
  //   .data(prices)
  //   .join(
  //     (enter) => enter.append("circle").attr("r", 10),
  //     (update) => update,
  //     (exit) => exit.remove()
  //   );
  //
  // circles.transition().duration(500);
  // circles.attr("cx", (d) => d / 200);
  // circles.attr("cy", (d, i) => i * 5);
  // circles.attr("fill", "#fff");
}
