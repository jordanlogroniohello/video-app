import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isMobile = false;

  constructor(
  	private breakpointObserver: BreakpointObserver,
  	private dialog: MatDialog
  	) {
    this.breakpointObserver.observe([
      '(max-width: 425px)'
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  openSearchModal(): void {
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '100%', 
      disableClose: true 
    });
  }
}
