import { Component, OnInit } from "@angular/core";
import { Widget } from "src/app/models/widget.model.client";
import { WidgetService } from "src/app/services/widget.service.client";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-widget-youtube",
  templateUrl: "./widget-youtube.component.html",
  styleUrls: ["./widget-youtube.component.css"]
})
export class WidgetYoutubeComponent implements OnInit {
  uid: string;
  wid: string;
  pid: string;
  wgid: string;
  widget: Widget = {
    widgetType: "",
    pageId: "",
    text: "",
    size: 0,
    width: "",
    url: ""
  };
  constructor(
    private widgetservice: WidgetService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log("dsfsdfsdfsd");
    this.activatedroute.params.subscribe(params => {
      this.uid = params["uid"];
      this.wid = params["wid"];
      this.pid = params["pid"];
      this.wgid = params["wgid"];
      this.widgetservice
        .findWidgetById(this.wgid)
        .subscribe((widget: Widget) => {
          this.widget = widget;
        });
    });
  }
  //Update header widget
  update() {
    this.widgetservice.updateWidget(this.widget).subscribe((up: any) => {
      this.router.navigate([
        "/user/" +
          this.uid +
          "/website/" +
          this.wid +
          "/page/" +
          this.pid +
          "/widget"
      ]);
    });
  }
  //Delete header widget
  delete() {
    this.widgetservice.deleteWidget(this.wgid).subscribe(() => {
      this.router.navigate([
        "/user/" +
          this.uid +
          "/website/" +
          this.wid +
          "/page/" +
          this.pid +
          "/widget"
      ]);
    });
  }
}
