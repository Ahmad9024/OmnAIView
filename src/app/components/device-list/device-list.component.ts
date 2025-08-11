import { Component, effect } from '@angular/core';
import { ChannelDataItem, DataService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  imports: [CommonModule],
})
export class DeviceListComponent{
  
  public devices= this.dataService.$processedData;
  // Store the currently selected device
  public selectedDevice: ChannelDataItem | null = null;

  constructor(private dataService: DataService) {}

}
