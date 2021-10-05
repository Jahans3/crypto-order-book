import * as d3 from "d3";
import { THEME } from "../../theme";
import { OrderTotal, OrderType } from "../../typings";

export function drawChart(
  data: OrderTotal[],
  svgElement: SVGSVGElement | null,
  type: OrderType
): undefined | (() => void) {
  if (!svgElement || !data.length) return;

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const svgDimensions = svgElement.getBoundingClientRect();
  const width = svgDimensions.width - margin.right - margin.left;
  const height = svgDimensions.height - margin.top - margin.bottom;
  const chartFill = type === "bid" ? THEME.chart.bidGreen : THEME.chart.askRed;

  const xRange = type === "bid" ? [width, 0] : [0, width];
  const yRange = type === "bid" ? [0, height] : [height, 0];

  // Set range
  const x = d3.scaleLinear().range(xRange);
  const y = d3.scaleLinear().range(yRange);

  const mapPrice = data.map(([price]) => price);
  const mapTotal = data.map(([, , total]) => total);

  const minPrice = Math.min(...mapPrice);
  const maxPrice = Math.max(...mapPrice);

  const minTotal = Math.min(...mapTotal);
  const maxTotal = Math.max(...mapTotal);

  const xDomain = type === "bid" ? [minTotal, maxTotal] : [maxTotal, minTotal];
  const yDomain = type === "bid" ? [maxPrice, minPrice] : [minPrice, maxPrice];

  // Scale ranges to our data
  x.domain(xDomain);
  y.domain(yDomain);

  const svg = d3
    .select(`svg.chart-${type}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.right})`);

  // Get our plotting functions
  const plotY = type === "bid" ? ([price]: OrderTotal) => y(price) : ([price]: OrderTotal) => y(price);
  const plotX = type === "bid" ? ([, , total]: OrderTotal) => x(total) : ([, , total]: OrderTotal) => x(total);

  svg
    .selectAll(".bar")
    .data(data)
    .join((enter) =>
      enter
        .append("rect")
        .attr("fill", chartFill)
        .attr("class", "bar")
        .attr("x", plotX)
        .attr("y", plotY)
        .attr("width", ([, , total]) => width - x(total))
        .attr("height", ([price]) => height - y(price))
    );

  function update() {
    d3.select(`svg.chart-${type}`).selectAll("g").remove().transition().duration(1000);
  }

  return update;
}
