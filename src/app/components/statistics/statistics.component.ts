import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  powerBiEmbedCode: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=caebe97d-a9d8-42a5-b4c5-6e362a7a1617&autoAuth=true&ctid=ad5ba4a2-7857-4ea1-895e-b3d5207a174f';
    this.powerBiEmbedCode = this.sanitizer.bypassSecurityTrustHtml(`<iframe title="campDB-publish" width="1140" height="541.25" src="${embedUrl}" frameborder="0" allowFullScreen="true"></iframe>`);
  }
}
