import { Injectable, signal} from '@angular/core';
import { environment } from '../../environments/environment';

// Define the structure of data items received from the WebSocket
export interface DataItem{
  deviceId: string;
  channel: number;
  timestamp : Date;
  value : number[];
}
// Define the structure for processed channel data
export interface ChannelDataItem{
  deviceId: string;
  channel: number;
  data: { timestamp: Date, value:number }[] ;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // Track pause state
  private isPaused = false;
  
// Observable signal for storing processed channel data
  private processedData$ = signal<ChannelDataItem[]>([]);
  // Expose the processed data as read-only
  public $processedData = this.processedData$.asReadonly();

  private ws: WebSocket | null = null;
   // Signal to track WebSocket connection status
  private isConnected = signal<boolean>(false);

  // Establish a WebSocket connection
  connect(): void {
    this.disconnect();
    this.ws = new WebSocket(`ws://${environment.webSocketServerName}:${environment.webSocketPort}`);

    // Handle successful connection
    this.ws.onopen = () => {
      console.log('Connection established.');
      this.isConnected.set(true);
      this.processedData$.set([]);
    };

    // Handle connection closure
    this.ws.onclose=() =>{
      console.log('Connection closed.');
      this.isConnected.set(false);
    };
    
    // Handle WebSocket errors
    this.ws.onerror=(error) =>{console.log('WebSocket error:', error)}
  }

  // Method for starting visualization, separate from connection setup
  startVisualization(): void {
    if (this.ws && this.isConnected()) {
      this.ws.onmessage = (event) => {
        // Process data only if not paused
        if (!this.isPaused) { 
          try {
             // Parse the incoming message as DataItem
            const data: DataItem = JSON.parse(event.data);
            console.log("Data", event.data);
            // Append data to the channels
            this.appendTimeBasedDataToChannels(data);
          } catch (e) {
            console.error('Error parsing the message:', e);
          }
        }
      }
    } else {
      console.warn('WebSocket is not connected. Cannot start visualization.');
    }
  }


  // Disconnect from the WebSocket
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  // Reset the processed data
  resetData(){
    if (confirm('Are you sure you want to reset the data?')) {
      this.processedData$.set([]);
      this.disconnect();
  }
  }

  // Method to pause/resume visualization
  togglePause(): void {
    this.isPaused = !this.isPaused;
  }

// Method to append incoming data to channels
private appendTimeBasedDataToChannels(data: DataItem) {
  // Update the processed data observable with new channel data
  this.processedData$.update((channels: ChannelDataItem[]) => {
    // Create a copy of current channels
    const newChannels = [...channels];
    // If the incoming data value is an array
    
    if (Array.isArray(data.value)) {
      data.value.forEach((value, index) => {
        // const existingChannel = newChannels[index];
        // Find the existing channel by device ID and channel number
        const existingChannel = newChannels.find(
          channel => channel.channel === data.channel && channel.deviceId === data.deviceId
        );
        const newData = {timestamp: data.timestamp, value: value};
        
        if(existingChannel){
          // Push new data into existing channel
          existingChannel.data.push(newData);
        }else {
          // Add new channel if it doesn't exist
          newChannels.push({deviceId: data.deviceId ,channel: index, data : [newData]});
        }

      });
    } 
      // If the incoming data value is a single number
      else if (typeof data.value === 'number') {
      // const existingChannel = newChannels.find(c => c.channel === 0);
      // Find the existing channel by device ID and channel number
      const existingChannel = newChannels.find(
        channel => channel.channel === 0 && channel.deviceId === data.deviceId
      );
      const newData = {timestamp: data.timestamp, value: data.value};
     
      if (existingChannel){
        existingChannel.data.push(newData);
      }else {
        newChannels.push({deviceId: data.deviceId ,channel: 0, data: [newData]});
      }
    }
    // Return the updated channels
    return newChannels;
  }); 
}
}