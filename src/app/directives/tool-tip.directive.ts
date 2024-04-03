import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective {

  constructor(private elRef:ElementRef,private renderer:Renderer2) { }


  @Input('appToolTip') toolTipContent:string='';

  createToolTip():HTMLElement{
    const toolTip=this.renderer.createElement('div');
    const text =this.renderer.createText(this.toolTipContent);
    this.renderer.appendChild(toolTip,text);
    this.renderer.addClass(toolTip,'toolTipMy');
    this.renderer.setStyle(toolTip,'poistion','absolute');
    // this.renderer.setStyle(toolTip,'font-family',)
    return toolTip;
  }

  @HostListener('mouseover')
  onMouseHover(){
    const myToolTip=this.createToolTip();
    this.renderer.appendChild(this.elRef.nativeElement,myToolTip);
    console.log('Mouse in');
  }

  @HostListener('mouseout')
  onMouseOut(){
    setTimeout(()=>{
      const toolTip=this.elRef.nativeElement.querySelector('.toolTipMy');
      this.renderer.removeChild(this.elRef.nativeElement,toolTip);
    },300)
 
  }

}
