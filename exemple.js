
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
