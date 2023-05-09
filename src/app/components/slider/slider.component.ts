import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  sliders = [
    {
      imagePath: '/assets/spinner1.png',
      active: true,
      button: true
    },
    {
      imagePath: '/assets/spinner2.png',
      active: false,
      button: false
    },
    {
      imagePath: '/assets/spinner3.png',
      active: false,
      button: false
    },
  ]

  constructor(){
  }

  goToSlide(i: number): void {
    const indexActiveSlide = this.sliders.findIndex(el => el.active === true);
    this.sliders[indexActiveSlide].active = false;
    this.sliders[i].active = true;
  }

  nextSlide(){
    const indexActiveSlide = this.sliders.findIndex(el => el.active === true);
    this.sliders[indexActiveSlide].active = false;
    if(indexActiveSlide === this.sliders.length - 1){
      this.sliders[0].active = true;
    } else {
      this.sliders[indexActiveSlide + 1].active = true;
    }
  }

  prevSlide(){
    const indexActiveSlide = this.sliders.findIndex(el => el.active === true);
    this.sliders[indexActiveSlide].active = false;
    if(indexActiveSlide === 0){
      this.sliders[this.sliders.length - 1].active = true;
    } else {
      this.sliders[indexActiveSlide - 1].active = true;
    }
  }
}
