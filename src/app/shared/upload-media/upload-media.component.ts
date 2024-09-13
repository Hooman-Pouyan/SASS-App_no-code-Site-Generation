import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NgxImageCompressService} from "ngx-image-compress";
import {NotificationService} from "@app/core/services/notification.service";
import {videoExtensions} from "@app/modules/global/global-variable";
import {dataURItoBlob} from "@app/modules/global/functions";
import {StoreSettingService} from "@app/core/services/store-setting.service";


@Component({
  selector: 'upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent implements OnInit, OnChanges {

  @Output() outputImage: EventEmitter<File> = new EventEmitter<File>();
  @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() inputMedia: string | File;
  @Input() title: string;
  @Input() bestWidth: number;
  @Input() bestHeight: number;
  @Input() bestAspect: string;
  @Input() mediaType: string;
  @Input() compressRate: number = 75;
  @Input() componentHeight: number;
  @Input() hasDelete: boolean = false;
  @Input() acceptableTypes: ('image' | 'gif' | 'video')[] = ["image", 'gif', 'video']

  mediaToShow: string | ArrayBuffer;
  base64Output: Event;
  fileType: 'video' | 'gif' | 'image';

  constructor(
    private imageCompress: NgxImageCompressService,
    private notificationService: NotificationService,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    if (this.inputMedia && typeof this.inputMedia != 'string') {

      if (this.inputMedia.type.includes('video')) {
        this.fileType = 'video'
      } else if (this.inputMedia.type.includes('gif')) {
        this.fileType = 'gif'
      } else if (this.inputMedia.type.includes('image')) {
        this.fileType = 'image'
      }
      this.fileToBase64(this.inputMedia)
      this.inputMedia = null;

    } else if (this.inputMedia && typeof this.inputMedia == 'string') {
      const fileExtension: string = this.inputMedia.split(".").pop()
      if (videoExtensions.includes(fileExtension)) {
        this.fileType = 'video'
      }
    }
  }

  fileUploadEvent(event): void {
    let file: File = event.target.files[0]

    if (file.type.includes('video') && this.acceptableTypes.includes('video')) {
      this.fileType = 'video'
      if (this.fileToBase64(event.target.files[0])) {
        this.outputImage.emit(event.target.files[0])
      } else {
        this.notificationService.error('خطایی رخ داده لطفا دوباره سعی کنید')
      }
    } else if (file.type.includes('gif') && this.acceptableTypes.includes('gif')) {
      this.fileType = 'gif'
      if (this.fileToBase64(event.target.files[0])) {
        this.outputImage.emit(event.target.files[0])
      } else {
        this.notificationService.error('خطایی رخ داده لطفا دوباره سعی کنید')
      }
    } else if (file.type.includes('image') && this.acceptableTypes.includes('image')) {
      this.fileType = 'image'
      this.base64Output = event
    } else {
      this.notificationService.error('فایل آپلود شده پشتیبانی نمیشود!')
    }
  }

  compressImage(base64: string) {
    const _imageByte: number = this.imageCompress.byteCount(base64)
    // 4MB or 3 * 10^6
    if (_imageByte >= 4e+6) {
      this.notificationService.error('حداکثر حجم فایل باید 2MB باید باشد')
      return
    }
    this.imageCompress.compressFile(base64, 1, 100, this.compressRate).then(
      result => {
        let file: File = dataURItoBlob(result, this.mediaType)
        if (this.fileToBase64(file)) {
          this.outputImage.emit(file)
        } else {
          this.notificationService.error('خطایی رخ داده لطفا دوباره سعی کنید')
        }
      }
    );
  }

  fileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      this.mediaToShow = null;
      setTimeout(() => {
        this.mediaToShow = (<FileReader>event.target).result;
        this.inputMedia = null;
      }, 500)
    };
    reader.readAsDataURL(file);
    return true;
  }

}
