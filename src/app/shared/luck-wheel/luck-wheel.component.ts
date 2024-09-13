import {AfterViewChecked, AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as WinWheel from 'winwheel';
import {CongratsDialogComponent} from "./congrats-dialog/congrats-dialog.component";
import {LuckWheelService} from "@app/core/services/luck-wheel.service";
import {NotificationService} from "@app/core/services/notification.service";
import {LandingService} from "@app/core/services/landing.service";
import {_window} from "@app/modules/global/global-variable";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'luck-wheel',
  templateUrl: './luck-wheel.component.html',
  styleUrls: ['./luck-wheel.component.scss']
})
export class LuckWheelComponent implements OnInit, AfterViewChecked, AfterViewInit {

  constructor(
    private luckWheelService: LuckWheelService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
    private landingService: LandingService,
    public dragDropService: DragDropService,
    public modulesService: ModulesService
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screen_width = _window.innerWidth
  }

  items: any[] = []
  theWheel: any;
  wheelDesc: string;
  idToLandOn: number;
  permission: boolean = false;
  otpStep: 1 | 2 | null = 1;
  form: FormGroup;
  screen_width: number
  public timer: number = 120;

  ngOnInit(): void {
    if (this.modulesService.luckyWheel) {
      this.createForm();
      this.luckWheelService.getWheelItems().subscribe(res => {
        if (res?.length) {
          const colors = ['#ff0000', '#ffffff']
          this.items = res.map(value => ({
            text: value.GIFT,
            id: value.GIFT,
            _id: value.ID,
            fillStyle: 'white',
            textFontSize: this.screen_width > 960 ? '16' : (this.screen_width > 400 ? '12' : '10'),
            textFontFamily: 'IranSans',
            chance: value.TIME,
          }))
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].fillStyle = colors[i % 2]
            this.items[i].strokeStyle = colors[i % 2]
            this.items[i].textFillStyle = 'black'
          }
        }
      });
      this.getDescription();
    }
  }

  ngAfterViewChecked() {
    if (this.modulesService.luckyWheel) {
      this.createWheel();
    }
  }

  ngAfterViewInit() {
    if (this.modulesService.luckyWheel) {
      this.createWheel();
    }
  }

  createWheel(): void {
    if (this.items.length && !this.theWheel) {
      this.theWheel = new WinWheel({
        'canvasId': 'canvas',
        'numSegments': this.items.length,
        'innerRadius': 20,
        'responsive': true,
        'rotationAngle': 360 / this.items.length / 2,
        'textAlignment': 'center',
        'textOrientation': 'horizontal',
        'segments': this.items,
        'animation':
          {
            'type': 'spinAndBack',
            'duration': 5,
            'spins': 25,
            'easing': 'Power2.easeInOut',
          }
      })
    }
  }

  getDescription(): void {
    this.landingService.getLandingValue().subscribe(res => {
      this.wheelDesc = res.find(f => f.VALUE_TYPE == "wheel")?.VALUE
    })
  }

  setWheelAspect(): number {
    if (this.screen_width < 350) {
      return 255
    } else if (this.screen_width < 450) {
      return 300
    } else if (this.screen_width < 600) {
      return 350
    } else if (this.screen_width > 800) {
      return 450
    }
  }

  setPrize() {
    this.items.forEach(each => {
      each.chance = +each.chance.match(/\d+/g).join('')
    })
    let temp = this.items.slice()
    temp.sort((a, b) => a.chance - b.chance);
    let sum = 0
    let random_num = this.getRandomInt(1, 1000)
    for (let i = 0; i < temp.length; i++) {
      sum += temp[i].chance
      if (sum >= random_num) {
        return temp[i]._id
      }
    }
    return temp[temp.length - 1]._id
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  calcResultDeg() {
    let segment_id = this.setPrize()
    this.idToLandOn = segment_id
    let temp = this.theWheel.segments.find(f => f && f._id == segment_id)
    this.theWheel.animation.stopAngle = temp.endAngle - (360 / this.items.length / 2)
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^(09)([0-9]{9})$')]],
      otp: ['', [Validators.required]],
    });
  }

  confirmPhone(): void {
    if (this.form.get('phone').invalid) {
      this.notificationService.error('شماره تلفن معتبر نمیباشد!');
      return;
    }
    this.getOtpCode();
  }

  getOtpCode(): void {
    const phoneNumber = this.form.value.phone;

    this.luckWheelService.getOtp(phoneNumber).subscribe(
      () => {
        this.otpStep = 2
        this.timer = 120;
        this.timerFunc();
      }
    );
  }

  verifyOtp(): void {
    const otp = this.form.value.otp;
    const phoneNumber = this.form.value.phone;

    this.luckWheelService.verifyOtp(phoneNumber, otp).subscribe(
      res => {
        if (res) {
          this.permission = true
          this.notificationService.valid('شماره شما تایید شد ، برروی گردونه کلیک کن')
          this.otpStep = null
        }
      }
    )
  }

  timerFunc() {
    setTimeout(() => {
      if (this.timer > 0) {
        this.timer = this.timer - 1;
        this.timerFunc();
      } else {
        this.timer = 0;
      }
    }, 1000)
  }

  wheelRound() {
    if (this.permission == true) {
      this.calcResultDeg()
      this.theWheel.startAnimation();
      setTimeout(() => {
        this.alertPrize()
      }, 5000)
    }
  }

  alertPrize() {
    const phoneNumber = this.form.value.phone;
    let found = this.items.find(f => f._id == this.idToLandOn)
    this.luckWheelService.submitPrize(phoneNumber, found._id).subscribe(() => {
      this.matDialog.open(CongratsDialogComponent, {
        data: found.text,
        width: '350px'
      }).afterClosed().subscribe(() => {
      })
    })
  }

}
