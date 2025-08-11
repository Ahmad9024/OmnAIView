import { Component, effect, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import * as d3 from "d3";

@Component({
  standalone: true,
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  // Store the processed data from the DataService
  private data = this.DataService.$processedData;

  // Reference to the graph container element
  @ViewChild('graph', { static: true }) graphContainer!: ElementRef;

  constructor(private DataService: DataService) {
    // Use effect to reactively update the graph when data changes
    effect(()=> {
      // checks for updates in the signal.
      this.data();
      // Update the graph with the new data
      this.updateGraph();
    })
  }

  // Define variables for SVG container, dimensions, scales, and line generator
  private svgContainer!      : d3.Selection<d3.BaseType, unknown, null, undefined>;
  private margin             = {top: 50, right: 20, bottom: 30, left: 50};
  private widthWOMargin      = 700;
  private heightWOMargin     = 500;
  private graphGroup!        : d3.Selection<SVGGElement, unknown, null, undefined>;
  private xScale!            : d3.ScaleTime<number, number>;
  private yScale!            : d3.ScaleLinear<number, number>;
  private lineGenerator!     : d3.Line<{ timestamp: Date; value: number }>;


  
  ngOnInit() {
    this.widthWOMargin = this.graphContainer.nativeElement.clientWidth;
    // Create an SVG container and set its viewBox for responsive design
    this.svgContainer = d3.select(this.graphContainer.nativeElement).select("svg")
      .attr('viewBox', `0 0 
        ${this.widthWOMargin + this.margin.left + this.margin.right} 
        ${this.heightWOMargin + this.margin.top + this.margin.bottom}`)

    // Append a group element to the SVG for drawing the graph
    this.graphGroup = this.svgContainer.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Define scales for the xScale and yScale axes
    this.xScale = d3.scaleTime().rangeRound([0, this.widthWOMargin]);
    this.yScale = d3.scaleLinear().rangeRound([this.heightWOMargin, 0]);

    // Create a line generator
    this.lineGenerator = d3.line<{ timestamp: Date; value: number}>()
            .x((d) => this.xScale(d.timestamp))
            .y((d) => this.yScale(d.value));
  }

  // Method to update the graph with the latest data  
  private updateGraph(): void {

    // Set the domains for the x and y scales based on the data
    this.xScale.domain(d3.extent(this.data().flatMap(channel => channel.data), d => d.timestamp) as [Date, Date]);
    this.yScale.domain([0, d3.max(this.data().flatMap(channel => channel.data), d => d.value) ?? 0]);    

    // Clear the previous graph elements before redrawing
    this.graphGroup.selectAll('*').remove();

    // Draw the x-axis at the bottom of the graph
    this.graphGroup.append('g')
    .attr('transform', `translate(0,${this.heightWOMargin})`)
    .call(d3.axisBottom(this.xScale))
    .select('.domain');

    // Draw the y-axis on the left side of the graph
    this.graphGroup.append('g')
    .call(d3.axisLeft(this.yScale))
    .append('text')
    .attr('fill', '#555')
    .attr('transform', 'rotate(-90)')
    .attr('y', 5)
    .attr('dy', '1.5em')
    .attr('text-anchor', 'end')

  // Define a color scale for different channels
  const color = d3.scaleOrdinal<string>(d3.schemeCategory10);

  // Loop through each channel's data and create a line for it
  this.data().forEach((channelData, index) => {
    this.graphGroup.append('path')
      .datum(channelData.data)
      .attr('fill', 'none')
      .attr('stroke', color(index.toString()))
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.1)
      .attr('d', this.lineGenerator);
  });
  }
}
