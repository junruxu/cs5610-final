import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Faq} from '../../../models/faq.model.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css']
})
export class FaqEditComponent implements OnInit {

  constructor(
    @Inject('FaqService') private faqService,
    @Inject('SharedService') private sharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  fid: String;
  faq: Faq;
  user: User;

  ngOnInit() {
    this.user = this.sharedService.user;
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.fid = params['fid'];
        this.faqService.findFaqById(this.fid)
          .subscribe((faq: Faq) => {
            this.faq = faq;
          });
      }
    );
  }

  updateFaq() {
    this.faqService.updateFaq(this.fid, this.faq)
      .subscribe(
        (faq: Faq) => {
          this.faq = faq;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
  }

  deleteFaq() {
    this.faqService.deleteFaq(this.fid)
      .subscribe(
        () => this.router.navigate(['../'], {relativeTo: this.activatedRoute})
      );
  }
}
