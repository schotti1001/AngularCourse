import { Component } from "@angular/core";

@Component({
    selector: 'app-servers',
    // Alternative to templateURl is to use template
    // template: `
    //     <app-server></app-server>
    //     <app-server></app-server>
    // `
    templateUrl: './servers.component.html'
})
export class ServersComponent {
    allowNewServer = false;
    serverCreationStatus = 'No server was created!';
    serverName = '';
    serverCreated = false;
    servers = ['Testserver', 'Testserver 2'];

    constructor() {
        setTimeout(() => {
            this.allowNewServer = true;
        }, 2000);
    }

    onCreateServer() {
        this.serverCreated = true;
        this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
        this.servers.push(this.serverName);
    }

    onUpdateServerName(event: Event) {
        this.serverName = (<HTMLInputElement>event.target).value;
    }
}