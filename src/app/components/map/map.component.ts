import { MapData } from './../../models/map-data';
import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ImageAlt, Square } from 'ngx-bootstrap-icons';
import { APIClientService } from 'src/app/services/apiclient.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit, AfterViewInit {
  @Input() mapData: MapData;
  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  ground1 = new Image();
  ground2 = new Image();
  block = new Image();
  ground_img = new Image();

  constructor(private apiClient: APIClientService) { }

  ngOnInit(): void {
    this.apiClient
      .getMap(1)
      .subscribe((response) => (this.mapData = response.body));
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.verifyCanvas();
    this.displayMap();
  }

  displayMap(): void {
    this.displayFloor(this.ctx);
    this.displayWall(this.ctx);
  }

  verifyCanvas(): void {
    if (this.ctx) {
      console.log('yes');
    } else {
      console.log('no')
    }
  }

  /// TODO properly calculate x and y position for block(s) overlayed on
  /// ground tile image in canvas
  displayWall(context): void {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        if (i == 0 || j == 0 || i == 5 || j == 5 || this.getRandomIndex(10) == 0) {
          let x: number = 128 * i;
          let y: number = 128 * j;
          this.block.src = "./assets/images/tiles/blocks/Block_A_02.png";
          this.block.onload = (): void => {
            context.drawImage(this.block, x, y);
          }
        }
      }
    }
  }

  /// TODO properly calculate the width (w) and height (h) for image inside of canvas
  /// based on resolution of screen
  displayFloor(context): void {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        switch (this.getRandomIndex(2)) {
          case 0: {
            let w: number = 256 * i;
            let h: number = 256 * j;
            this.ground1.src = "./assets/images/tiles/ground/Ground_Tile_01_C.png";
            this.ground1.onload = (): void => {
              context.drawImage(this.ground1, 0, 0, w, h);
            }
            break;
          }
          case 1: {
            let w: number = 256 * i;
            let h: number = 256 * j;
            this.ground2.src = "./assets/images/tiles/ground/Ground_Tile_02_C.png";
            this.ground2.onload = (): void => {
              context.drawImage(this.ground2, 0, 0, w, h);
            }
            break;
          }
        }
      }
    }
  }

  getRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
  }

}
