import { Directive, ElementRef, Input, HostListener, Component, OnInit, ViewChild } from '@angular/core';

@Directive({ selector: '[supre-dropdown-menu-close]' })
export class DropdownCloseDirective{
  @Input('supre-dropdown-menu-close')
  closeEvent:string;

  constructor(private _elementRef: ElementRef) {
    console.log("supre-dropdown-menu-close")
  }

  @HostListener('click', ['$event'])
  @HostListener('change', ['$event'])
  handleEvent(event){
    console.log("handleEvent", event);
    if(event && event.type && this.closeEvent != event.type){
      console.log("stopping", event);
      event.stopPropagation();
    }
  }
}

@Component({
  selector: 'supre-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  @Input('trigger')
  trigger:string = "click";

  @Input('pointed')
  pointed:boolean = true;

  @Input('align')
  preferredPositions = ["bottom-right","bottom-left","top-right","top-left"];

  @ViewChild('menu') menu;


  isOpen:boolean = false;
  isPlaced:boolean = false;

  delay:any = {
    close : 1
  }

  open(){
    this.isPlaced = false;
    this.isOpen = true;
    setTimeout(() => this.positionMenu(), 1);
  }

  close(){
    this.isOpen = false;
    this.isPlaced = false;
  }

  handleMouseEnter(){
    if(this.trigger === "hover"){
      this.open();
    }
  }

  handleMouseLeave(){
    if(this.trigger === "hover"){
      this.close();
    }
  }

  handleClick(event){
    if(!this.isOpen){
      document.addEventListener('click', this.handleOffClick.bind(this));
      this.open();
    }else if(this.menu.nativeElement.contains(event.target)){
      console.log("handleClick", event);
      setTimeout(() => {this.close();}, this.delay.close);
    }
  }

  handleOffClick(){
    if (!this._elementRef.nativeElement.contains(event.target)) { // check click origin
        document.removeEventListener('click', this.handleOffClick.bind(this));
        this.close();
    }
  }

  handleChange(event){
    console.log("handleChange", event);
    setTimeout(() => {this.close();}, this.delay.close);
  }

  positionMenu() {
    let positions = this.preferredPositions;
    var fits = positions.some( position => this.placeMenuAt(position));
    if(!fits)
      this.placeMenuAt(positions[0]);
    this.isPlaced = true;
  }

  placeMenuAt(position:string){
    if(!this.menu){
      return;
    }

    this.menu.nativeElement.className = "menu-activation " + (this.pointed ? "pointed " : "") + position.toLowerCase();
    let rect = this.menu.nativeElement.getBoundingClientRect();
    let viewport:any = {
      height : Math.max(document.documentElement.clientHeight, window.innerHeight),
      width : Math.max(document.documentElement.clientWidth, window.innerWidth)
    }
    let fits:any = {
      bottom : rect.bottom <= viewport.height,
      right : rect.right <= viewport.width,
      left : rect.left > 0,
      top : rect.top > 0
    }
    return fits.bottom && fits.right && fits.left && fits.top;
  }

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
  }

}
