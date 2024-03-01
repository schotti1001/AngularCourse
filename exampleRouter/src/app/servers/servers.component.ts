import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
                private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  reloadMe() {
    //by default this would use the current directory as base, with 'relativeTo' is starts there 
    //therefore this button is now successfully broken :)
    this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
