import { Component, effect } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})

export class ToolbarComponent{

  public onOffConnect = false;
  public visualizationStarted = false;
  public isPaused = false; 

  constructor(private dataService: DataService) {}

  // Toggles WebSocket connection
  toggleConnection() : void{
    if(this.onOffConnect) {
      this.dataService.disconnect();
      this.onOffConnect = false;
      this.visualizationStarted = false;
    } else {
      this.onOffConnect = true;
      this.dataService.connect();
    }

  }
  // Toggles visualization (start, pause, resume)
  toggleVisualization(): void{
    if(this.visualizationStarted && !this.isPaused){
      // Pause the visualization
      this.dataService.togglePause();
      this.isPaused = true;
    }else if (this.isPaused) {
      // Resume the visualization
      this.dataService.togglePause();
      this.visualizationStarted = true;
      this.isPaused = false;
    }else {
      // Start the visualization for the first time
      this.dataService.startVisualization();
      this.visualizationStarted = true;
      this.isPaused = false;
    }
  }

  // Method to reset the data
  clearData(): void {
    this.dataService.resetData();
    this.visualizationStarted = false;
    this.isPaused = false;
    this.onOffConnect = false;
  }
}
