import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public images: string[] = [
    'assets/img/fondo3.png',
    'assets/img/fondo2.png',
    'assets/img/fondo4.png'
  ];
  public currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }
  
  startSlideshow(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);  // Cambia la imagen cada 3 segundos
  }

  // Método para ir a la imagen anterior
  prevSlide(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  // Método para ir a la siguiente imagen
  nextSlide(): void {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
  }

}
