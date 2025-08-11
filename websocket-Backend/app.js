const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const portInput = document.getElementById('portInput');

let ws; // WebSocket-Verbindung
let data = []; // Speichert die empfangenen Daten

// Initialisiert den Graphen
const svg = d3.select("#graph").append("svg")
    .attr("width", 960)
    .attr("height", 500);

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleTime().rangeRound([0, width]);
const y = d3.scaleLinear().rangeRound([height, 0]);

const line = d3.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.value); });

connectBtn.addEventListener('click', () => {
    const port = portInput.value;
    ws = new WebSocket(`ws://localhost:${port}`);

    ws.onopen = () => {
        console.log('Verbindung hergestellt.');
        disconnectBtn.disabled = false;
        connectBtn.disabled = true;
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        data.push({timestamp: new Date(message.timestamp), value: message.value});

        // Aktualisiert den Graphen mit den neuen Daten
        updateGraph();
    };

    ws.onclose = () => {
        console.log('Verbindung geschlossen.');
        disconnectBtn.disabled = true;
        connectBtn.disabled = false;
    };
});

disconnectBtn.addEventListener('click', () => {
    if (ws) {
        ws.close();
    }
});

function updateGraph() {
    // Setzt die Skalen basierend auf den aktuellen Daten
    x.domain(d3.extent(data, d => d.timestamp));
    y.domain(d3.extent(data, d => d.value));

    // Entfernt den alten Graphen
    g.selectAll("*").remove();

    // Zeichnet die x-Achse
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    // Zeichnet die y-Achse
    g.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Wert");

    // Zeichnet die Linie basierend auf den Daten
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}

