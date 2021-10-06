import * as d3 from "d3";
import { THEME } from "../../theme";
import { OrderTotal, OrderType } from "../../typings";
import { ORDER_TYPE } from "../../constants";

export default function drawChart(
  data: OrderTotal[],
  svgElement: SVGSVGElement | null,
  type: OrderType
): undefined | (() => void) {
  if (!svgElement || !data.length) return;

  const isBid = type === ORDER_TYPE.BID;
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const svgDimensions = svgElement.getBoundingClientRect();
  const width = svgDimensions.width - margin.right - margin.left;
  const height = svgDimensions.height - margin.top - margin.bottom;
  const chartFill = isBid ? THEME.chart.bidGreen : THEME.chart.askRed;

  const xRange = [width, 0];
  const yRange = [0, height];

  // Set range
  const x = d3.scaleLinear().range(xRange);
  const y = d3.scaleLinear().range(yRange);

  const mapPrice = data.map(([price]) => price);
  const mapTotal = data.map(([, , total]) => total);

  const minPrice = Math.min(...mapPrice);
  const maxPrice = Math.max(...mapPrice);

  const minTotal = Math.min(...mapTotal);
  const maxTotal = Math.max(...mapTotal);

  const xDomain = isBid ? [minTotal, maxTotal] : [maxTotal, minTotal];
  const yDomain = isBid ? [maxPrice, minPrice] : [minPrice, maxPrice];

  // Scale ranges to our data
  x.domain(xDomain);
  y.domain(yDomain);

  const svg = d3.select(`svg.chart-${type}`).append("g");

  // Get our plotting functions
  const plotY = ([price]: OrderTotal) => y(price);
  const plotHeight = ([price]: OrderTotal) => height - y(price);
  const plotX = isBid ? ([, , total]: OrderTotal) => x(total) : ([, , total]: OrderTotal) => width - x(total);
  const plotWidth = isBid ? ([, , total]: OrderTotal) => width - x(total) : ([, , total]: OrderTotal) => x(total);

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
        .attr("width", plotWidth)
        .attr("height", plotHeight)
    );

  function clearStaleData() {
    d3.select(`svg.chart-${type}`).selectAll("g").remove().transition().duration(1000);
  }

  return clearStaleData;
}
