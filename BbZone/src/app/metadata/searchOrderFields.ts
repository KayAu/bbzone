
 
export class SearchOrderFields {
    public static fields = [
        {
            "fieldName": "productId",
            "displayText": "Product",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "productId",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetProducts",
                "cascadeTo":"productCategoryId"
            }
        },
        {
            "fieldName": "productCategoryId",
            "displayText": "Product Category",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "productCategoryId",
                "controlType": "cascadeDropdown",
                "maxLength": 0,
                "datasourceUrl": "GetCategoriesByProduct",
                "cascadeTo": "productPackageId"
            }
        },
        {
            "fieldName": "productPackageId",
            "displayText": "Product Package",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "productPackageId",
                "controlType": "cascadeDropdown",
                "maxLength": 0,
                "datasourceUrl": "GetPackagesByCategory"
            }
        },
        {
            "fieldName": "residentialType",
            "displayText": "Residential Type",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "residentialType",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetResidentialType"
            }
        },
        {
            "fieldName": "agent",
            "displayText": "Agent",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "agent",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetAgents"
            }
        },
        {
            "fieldName": "orderStatusId",
            "displayText": "Status",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "orderStatusId",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetStatus"
            }
        },
        {
            "fieldName": "submittedDate",
            "displayText": "Submitted Date",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "submittedDate",
                "controlType": "dateRange",
                "maxLength": 0
            }
        },
        {
            "fieldName": "activationDate",
            "displayText": "Activated Date",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "activationDate",
                "controlType": "dateRange",
                "maxLength": 0
            }
        },
        {
            "fieldName": "keyword",
            "displayText": "Keyword",
            "width": "col-sm-4",
            "dataFieldControl": {
                "controlName": "keyword",
                "controlType": "textbox",
                "maxLength": 100,
                "placeholder": "Customer, company, residential name or order no"
            }
        },
        {
            "fieldName": "documentCompleted",
            "displayText": "Doc. Completed",
            "width": "col-sm-2",
            "dataFieldControl": {
                "controlName": "documentCompleted",
                "controlType": "select",
                "maxLength": 0,
                "datasourceUrl": "GetDocStatus"
            }
        }
    ]
}
