import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input, Output,
  Renderer2
} from '@angular/core';
import {CredentialsService} from "@app/core/services/credentials.service";
import {MatDialog} from "@angular/material/dialog";
import {EditElementDialogComponent} from "@app/shared/edit-element-dialog/edit-element-dialog.component";
import {DragDropService, DragDropValueModel} from "@app/core/services/drag-drop.service";
import {EditMediaElementDialogComponent} from "@app/shared/edit-media-element-dialog/edit-media-element-dialog.component";
import {LandingService} from "@app/core/services/landing.service";
import {NotificationService} from "@app/core/services/notification.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Directive({
  selector: '[editElement]',
})
export class EditElementDirective implements AfterViewInit {

  @Input() editType: string;
  @Input() bestWidth: string;
  @Input() bestHeight: string;
  @Output() output: string;
  src: string;
  link: string;

  constructor(
    private credentialsService: CredentialsService,
    private _el: ElementRef,
    private _renderer: Renderer2,
    private matDialog: MatDialog,
    public dragDropService: DragDropService,
    private landingService: LandingService,
    private notificationService: NotificationService,
    private dynamicMediaService: DynamicMediaService
  ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onLoad()
    }, 1500)
  }

  onLoad() {
    if (
      this.credentialsService.isAdmin &&
      (this._el?.nativeElement?.tagName == 'IMG' || this._el?.nativeElement?.tagName == 'IMAGE-LAZY' || this._el?.nativeElement?.tagName == 'VIDEO')
    ) {
      if (this._el.nativeElement.tagName == 'IMAGE-LAZY') {
        this.src = this.dynamicMediaService.getMedia(this.editType)
      }
      if (this._el?.nativeElement?.tagName == 'VIDEO') {
        this.src = this.dynamicMediaService.getMedia(this.editType)
      }

      if (
        this._el?.nativeElement?.parentElement?.id.includes('jarallax') &&
        this._el?.nativeElement?.parentElement?.parentElement?.className.includes('background-overlay')
      ) {
        const _href: string = this._el?.nativeElement?.parentElement?.parentElement.href
        let editElmBtn = document.createElement("button");
        editElmBtn.className = 'mat-focus-indicator mat-mini-fab mat-button-base mat-primary'
        editElmBtn.style['position'] = 'absolute'
        editElmBtn.style['top'] = '5px'
        editElmBtn.style['left'] = '5px'
        editElmBtn.style['zIndex'] = '1000'

        // @ts-ignore
        editElmBtn.onclick = (_this: GlobalEventHandlers, ev: MouseEvent) => {
          this.openMediaEditDialog(this.src || this._el.nativeElement.src, this.editType, _href)
        }
        editElmBtn.innerHTML =
          `<span class="mat-button-wrapper">
               <mat-icon class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">
                    edit
               </mat-icon>
          </span>`
        this._el.nativeElement.parentElement.parentElement.parentElement.style['position'] = 'relative'
        this._el.nativeElement.parentElement.parentElement.parentElement.appendChild(editElmBtn)
      } else if (
        this._el?.nativeElement?.parentElement?.tagName == 'A' ||
        this._el?.nativeElement?.parentElement?.id.includes('jarallax') ||
        this._el?.nativeElement?.parentElement?.className.includes('circle') ||
        this._el?.nativeElement?.parentElement?.className.includes('img-overlay')
      ) {
        const _href: string = this._el.nativeElement.parentElement.getAttribute('href_link')
        let editElmBtn = document.createElement("button");
        editElmBtn.className = 'mat-focus-indicator mat-mini-fab mat-button-base mat-primary'
        editElmBtn.style['position'] = 'absolute'
        editElmBtn.style['top'] = '5px'
        editElmBtn.style['left'] = '5px'
        editElmBtn.style['zIndex'] = '1000'

        // @ts-ignore
        editElmBtn.onclick = (_this: GlobalEventHandlers, ev: MouseEvent) => {
          this.openMediaEditDialog(this.src || this._el.nativeElement.src, this.editType, _href)
        }
        editElmBtn.innerHTML =
          `<span class="mat-button-wrapper">
               <mat-icon class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">
                    edit
               </mat-icon>
          </span>`
        this._el.nativeElement.parentElement.parentElement.style['position'] = 'relative'
        this._el.nativeElement.parentElement.parentElement.appendChild(editElmBtn)
      } else if (this._el?.nativeElement?.parentElement) {
        const _href: string = this._el.nativeElement.parentElement.href
        let editElmBtn = document.createElement("button");
        editElmBtn.className = 'mat-focus-indicator mat-mini-fab mat-button-base mat-primary'
        editElmBtn.style['position'] = 'absolute'
        editElmBtn.style['top'] = '5px'
        editElmBtn.style['left'] = '5px'
        editElmBtn.style['zIndex'] = '1000'
        // @ts-ignore
        editElmBtn.onclick = (_this: GlobalEventHandlers, ev: MouseEvent) => {
          this.openMediaEditDialog(this.src || this._el.nativeElement.src, this.editType, _href)
        }
        editElmBtn.innerHTML =
          `<span class="mat-button-wrapper">
               <mat-icon class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">
                    edit
               </mat-icon>
          </span>`
        this._el.nativeElement.parentElement.style['position'] = 'relative'
        this._el.nativeElement.parentElement.appendChild(editElmBtn)
      }

    }

  }

  @HostListener('click', ['$event'])
  onMouseEnter() {
    if (this.credentialsService.isAdmin && !this._el.nativeElement.children.length) {
      this._el.nativeElement.innerHTML +=
        `<button id="adminEdit" style="z-index: 1000" class="mat-focus-indicator mat-mini-fab mat-button-base mat-primary">
            <span class="mat-button-wrapper">
                <mat-icon class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">
                          edit
                </mat-icon>
            </span>
        </button>`;

      let hasLink: boolean = this._el?.nativeElement?.tagName == 'A' || this._el?.nativeElement?.tagName == 'BUTTON';

      // @ts-ignore
      document.getElementById('adminEdit').onclick = (_this: GlobalEventHandlers, ev: MouseEvent) => {
        document?.getElementById('adminEdit')?.remove()
        this.openEditDialog(this._el.nativeElement.innerText, this.editType, hasLink)
      }
    }
    setTimeout(() => {
      this.removeEditBtn();
    }, 1500)
  }

  removeEditBtn() {
    if (this.credentialsService.isAdmin) {
      setTimeout(() => {
        document?.getElementById('adminEdit')?.remove()
      }, 2000)
    }
  }

  openEditDialog(text: string, type: string, hasLink: boolean, link?: string): void {
    const enValue: string | undefined = this.dragDropService.findOneByName(type)?.text_en
    const _data: DragDropValueModel = {
      link: this.link,
      text: text,
      text_en: enValue,
      name: type,
    }
    this.matDialog.open(EditElementDialogComponent, {
      width: '550px',
      maxWidth: '100%',
      data: {
        ..._data,
        hasLink: hasLink
      }
    }).afterClosed().subscribe((res: DragDropValueModel) => {
      if (res) {
        this.dragDropService.editElement(res);
        this.dragDropService.editElement(res);
        text = res.text
        debugger
        this.link = res.link
        this.output = text
        this._el.nativeElement.innerText = res.text

      }
    })
  }

  openMediaEditDialog(media: string, type: string, link?: string): void {
    this.src = media
    const _data: any = {
      link: this.link,
      media: media,
      name: type,
      bestWidth: this.bestWidth,
      bestHeight : this.bestHeight
    }
    this.matDialog.open(EditMediaElementDialogComponent, {
      width: '1000px',
      maxWidth: '100%',
      data: _data
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.media) {
          if (res.media.type.includes('video')) {
            this.landingService.setLandingVideo(type, res.media).subscribe(() => {
              this.notificationService.valid('با موفقیت ثبت شد')
              this.dynamicMediaService.initMedias()
            })
          } else {
            this.landingService.setLandingImage(type, res.media).subscribe(() => {
              this.notificationService.valid('با موفقیت ثبت شد')
              this.dynamicMediaService.initMedias()
            })
          }
        } else if (res.deleted) {
          this.landingService.setLandingImage(type, undefined).subscribe(() => {
            this.notificationService.valid('با موفقیت ثبت شد')
            this.dynamicMediaService.initMedias()
          })
        }
        if (res.link) {
          this.landingService.setLandingValue(type + 'Link', res.link).subscribe(() => {
            this.notificationService.valid('با موفقیت ثبت شد')
            this.dynamicMediaService.initMedias()
          })
          this.link = res.link
        }
      }
    })
  }

}
