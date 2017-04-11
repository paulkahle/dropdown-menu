import { Directive, ElementRef, Input, HostListener, Component, OnInit, ViewChild } from '@angular/core';


/**
   * DropdownCloseDirective
   *
   * stops event propogation of events that should not close the dropdown
   */
@Directive({ selector: '[supre-dropdown-menu-close]' })
export class DropdownCloseDirective{
  @Input('supre-dropdown-menu-close')
  closeEvent:string;

  constructor(private _elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  @HostListener('change', ['$event'])
  handleEvent(event){
    if(event && event.type && this.closeEvent != event.type){
      event.stopPropagation();
    }
  }
}

/**
   * DropdownMenuComponent
   *
   * shows, hides, and positions a dropdown menu based on a trigger event
   */
@Component({
  selector: 'supre-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  /** Inputs */
  @Input('trigger') trigger:string = "click";
  @Input('pointed') pointed:boolean = true;
  @Input('align') preferredPositions = ["bottom-right","bottom-left","top-right","top-left"];

  /** View child for menu element */
  @ViewChild('menu') menu;


  private isOpen:boolean = false;
  private isPlaced:boolean = false;
  private delay:any = { close : 1 }

  /**
     * Open Dropdown.
     * Open and position the dropdown.
     *
     * @memberOf DropdownMenuComponent
     */
  public open(){
    this.isPlaced = false;
    this.isOpen = true;

    // wait a tick to add menu to DOM before calculating position
    setTimeout(() => this.positionMenu(), 1);
  }

  /**
     * Close Dropdown.
     *
     * @memberOf DropdownMenuComponent
     */
  public close(){
    this.isOpen = false;
    this.isPlaced = false;
  }

  /**
     * handleMouseEnter
     * handles mouseenter event to open dropdown when trigger  = "hover"
     * @memberOf DropdownMenuComponent
     */
  handleMouseEnter(){
    if(this.trigger === "hover"){
      this.open();
    }
  }

  /**
     * handleMouseLEave
     * handles mouseleave event to close dropdown when trigger  = "hover"
     * @memberOf DropdownMenuComponent
     */
  handleMouseLeave(){
    if(this.trigger === "hover"){
      this.close();
    }
  }

  /**
     * handleClick
     * handles opening or closing the dropdown on click.
     * @memberOf DropdownMenuComponent
     */
  handleClick(event){
    if(!this.isOpen){
      // add listener to close dropdown when clicking elsewhere on screen
      document.addEventListener('click', this.handleOffClick.bind(this));
      this.open();
    }else if(this.menu.nativeElement.contains(event.target)){
      setTimeout(() => {this.close();}, this.delay.close);
    }
  }

  /**
     * handleOffClick
     * hcloses the dropdown when clicking off screen
     * @memberOf DropdownMenuComponent
     */
  handleOffClick(){
    if (!this._elementRef.nativeElement.contains(event.target)) { // check click origin
        document.removeEventListener('click', this.handleOffClick.bind(this));
        this.close();
    }
  }

  /**
     * handleChange
     * closes the dropdown on a change event in child
     * @memberOf DropdownMenuComponent
     */
  handleChange(event){
    setTimeout(() => {this.close();}, this.delay.close);
  }

  /**
     * positionMenu
     * Places the dropdown on screen.  Checks each preferredPosition for the first that fits on screen.
     * If none fit then use first preferredPosition
     * @memberOf DropdownMenuComponent
     */
  positionMenu() {
    let positions = this.preferredPositions;
    var fits = positions.some( position => this.placeMenuAt(position));
    if(!fits)
      this.placeMenuAt(positions[0]);
    this.isPlaced = true;
  }

  /**
     * placeMenuAt
     * Places the dropdown menu at the position and returns a boolean value for whether
     * it fits on screen
     *
     * @param {string} position
     *
     * @memberOf DropdownMenuComponent
     */
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
