
/**
 * define your class who extend the plagin
 */
YourProject.HeaderMenuExportGrid = Ext.extend(Ext.ux.grid.GridHeaderMenuExport, {

    init: function(grid){

        // text of the button
        this.superclass().exportText = 'Your text';
        // call ajax for create a xlsx file
        this.superclass().exportExcel = function(res) {
            if (res.length > 0) {
                YourProject.DownloadFile({
                    url     : '/export/export-excel/',
                    params  : {datas: Ext.encode(res)}
                });
            } else {
                Ext.Msg.info("Info", "You don'h have anything to export");
            }
        };

        Ext.apply(grid.getView(), this.viewConfig);
    }
});


/**
 * then, use your class in grid define
 */
var grid = new Ext.grid.GridPanel({
    store: store,
    height: 400,
    loadMask: true,
    columnLines: true,
    columns: [
        {header: "CR", width: 30, dataIndex: 'codeConseil', sortable: true},
        {header: "Libellé", width: 200, dataIndex: 'libelleConseil', sortable: false},
        {header: "Session en cours", width: 120, dataIndex: 'dateSession', sortable: false, format : 'd/m/Y'}
    ],
    plugins: [new YourProject.HeaderMenuExportGrid()]
});
