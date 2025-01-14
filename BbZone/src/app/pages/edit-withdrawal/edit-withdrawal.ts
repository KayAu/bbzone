import { Component } from '@angular/core';
import { TablerowDataMapping } from 'src/app/model/tablerow.data.mapping';
import { LoaderService } from 'src/app/loader/loader.service';
import { DataService } from 'src/app/services/data.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { DataDisplayType, ControlType } from 'src/app/enums/dataDisplayType';
import { ApiController } from 'src/app/enums/apiController';
import { CreateWithdrawalColumns } from '../../metadata/createWithdrawalColumns';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'edit-withdrawal',
    templateUrl: './edit-withdrawal.html'
})

export class EditWithdrawal  { //extends ListEvent
    currentUser: LoginUser;
    dataRowMapper: TablerowDataMapping[] = [];
    formRecord: any = {};
    isUpdating: boolean = false;
    recordId: number;
    dropdownItems: any[];
    allowEdit: boolean = true;
    displayType = DataDisplayType;

    constructor(public loaderService: LoaderService, public dataService: DataService, public formEvent: BroadcastService, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.recordId = this.route.snapshot.params.id;
        this.loadRecord(this.route.snapshot.params.id);
        this.dataRowMapper = this.getTablerowDataMapping();
        if (this.currentUser.isAdmin) {
            this.loadStatus();
        }
    }

    getTablerowDataMapping(): TablerowDataMapping[] {
        let columnMappings = CreateWithdrawalColumns.fields.map(o => new TablerowDataMapping(o.fieldName,
            o.headerText,
            DataDisplayType[o.displayType],
            o.keyField,
            o.colWidth));

        return columnMappings;
    }

    update() {
        this.dataService.update(ApiController.WithdrawalView, this.formRecord.withdrawalId, this.formRecord).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-withdrawal']);
        });
    }

    cancel() {
        this.dataService.get(`${ApiController.WithdrawalView}/Cancel`, this.formRecord.withdrawalId).subscribe(data => {
            this.isUpdating = false;
            this.router.navigate(['/view-withdrawal']);
        });
    }

    private loadStatus() {
        this.dataService.getAll(`${ApiController.Dropdown}/GetWithdrawalStatus`).subscribe(results => {
            this.dropdownItems = results;
        });

    }
    private loadRecord(recordId: number) {
        this.dataService.get(ApiController.WithdrawalView, recordId).subscribe(data => {
            this.formRecord = data;
        });
    }
}


