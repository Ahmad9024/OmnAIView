import { Component } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GraphComponent } from './components/graph/graph.component';
import { DeviceListComponent } from './components/device-list/device-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToolbarComponent, GraphComponent, DeviceListComponent],
  template: `
    <section>
      <app-toolbar> </app-toolbar>
      <app-graph> </app-graph>
      <app-device-list> </app-device-list>
        
    </section>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'OmnAIView';
}
