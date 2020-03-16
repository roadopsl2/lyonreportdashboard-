/**
 * Created by SRIVASTR on 04/07/2019.
 */
var app = angular.module("exportToCSV",[]);

app.directive('exportToCsv',function(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var el = element[0];
            element.bind('click', function(e){
                var table = document.getElementById('table');
                var csvString = '';
                for(var i=0; i<table.rows.length;i++){
                    var rowData = table.rows[i].cells;
                    for(var j=0; j<rowData.length;j++){
                        csvString = csvString + rowData[j].innerHTML + ",";
                    }
                    csvString = csvString.substring(0,csvString.length - 1);
                    csvString = csvString + "\n";
                }
                csvString = csvString.substring(0, csvString.length - 1);
                var a = $('<a/>', {
                    style:'display:none',
                   // href:'data:application/octet-stream;base64,'+btoa(csvString),


                    href:'data:image/svg+xml'+base64EncodeUnicode(csvString),
                    download:'Daily_Query.csv'
                }).appendTo('body')
                a[0].click()
                a.remove();
            });
        }
    }





    function base64EncodeUnicode(str) {
        // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
        // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
        utf8Bytes = encodeURIComponent(str).replace(/%''-([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        });

        return btoa(utf8Bytes);
    }





});





app.controller ("caseCtrl", function ($scope,$http) {

/*
    $scope.message = "";
    urlservicename ='http://localhost:4300'
    //var records ='' ;
    $http({
        method: 'GET',
        url: urlservicename ,    //\\\\aa-ap920v\\e$\\Logs\\TcpFacade\\XmlTcpFacade.2018-09-27.1.log',
        data: {},
        headers: {
            'Content-Type': 'text/plain'

        }
    }).then(function (resultname) {

        console.log(resultname.data.recordset);
        $scope.records=resultname.data.recordset ;

    })

   */










    $scope.ViewReport=function()
    {
        console.log('click');
        //console.log($scope.sdate) ;
        $scope.exist =false;
        $scope.message = "";
        //urlservicename ='http://localhost:4300'

        //urlservicename ='https://lyonreport.azurewebsites.net?sdate='+$scope.sdate +'&edate=' + $scope.edate
        //urlservicename ='http://10.66.19.26:4300?sdate='+$scope.sdate +'&edate=' + $scope.edate
        urlservicename ='https://lyonreport.azurewebsites.net?sdate='+$scope.sdate +'&edate=' + $scope.edate
        console.log(urlservicename) ;
        //var records ='' ;
        $http({
            method: 'GET',
            url: urlservicename ,    //\\\\aa-ap920v\\e$\\Logs\\TcpFacade\\XmlTcpFacade.2018-09-27.1.log',
            data: {},
            headers: {
                'Content-Type': 'text/plain'

            }
        }).then(function (resultname) {

            console.log(resultname.data.recordset);
            $scope.records=resultname.data.recordset ;
            $scope.exist =true;
        })

    }

}) ;


app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        compile: function() {
            return {
                pre: function(scope, element, attrs, ngModelCtrl) {
                    var format, dateObj;
                    //format = (!attrs.dpFormat) ? 'd-m-yyyy' : attrs.dpFormat;
                    format = (!attrs.dpFormat) ? 'yyyy-m-d' : attrs.dpFormat;

                    if (!attrs.initDate && !attrs.dpFormat) {
                        // If there is no initDate attribute than we will get todays date as the default
                        dateObj = new Date();
                        scope[attrs.ngModel] = dateObj.getDate() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getFullYear();
                        //scope[attrs.ngModel] = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
                    } else if (!attrs.initDate) {
                        // Otherwise set as the init date
                        scope[attrs.ngModel] = attrs.initDate;
                    } else {
                        // I could put some complex logic that changes the order of the date string I
                        // create from the dateObj based on the format, but I'll leave that for now
                        // Or I could switch case and limit the types of formats...
                    }
                    // Initialize the date-picker
                    $(element).datepicker({
                        format: format,
                    }).on('changeDate', function(ev) {
                        // To me this looks cleaner than adding $apply(); after everything.
                       scope.$apply(function () {
                            ngModelCtrl.$setViewValue(ev.format(format));
                        });
                    });
                }
            }
        }
    }
});

