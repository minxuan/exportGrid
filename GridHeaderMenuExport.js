/*!
 * Ext JS Library 3.4
 * Copyright(c) 2006-2017 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * This plugin add a button "Print" in your grid header menu
 * To use this plugin, you need to add a class in your project css
 * .xg-hmenu-print{
 *     background-image: url(../javascript/extjs/resources/icons/fam/printer.png);
 *     background-repeat: no-repeat;
 * }
 */
Ext.ns('Ext.ux.grid');

Ext.ux.grid.GridHeaderMenuExport = Ext.extend(Ext.util.Observable, {

    constructor: function(config){
        this.config = config;
    },

    init: function(grid){
        Ext.apply(grid.getView(), this.viewConfig);
    },

    viewConfig: {
        exportText: 'Print',

        // ajouter un lien "Export" dans la liste deroulante
        afterRenderUI: function(){
            this.constructor.prototype.afterRenderUI.apply(this, arguments);
            if(this.grid.enableExport !== false){
                this.hmenu.add(
                    '-',
                    {
                        itemId  : 'export',
                        text    : this.exportText,
                        // TODO: class css to be creat in project css, exemple :
                        // .xg-hmenu-print{
                        //     background-image: url(../javascript/extjs/resources/icons/fam/printer.png);
                        //     background-repeat: no-repeat;
                        //  }
                        cls     : 'xg-hmenu-print',
                        scope   : this,
                        // in this plugin, the handler export all datas to SERVER
                        // but you can creat your own handler to do any thing you want
                        handler : this.exportExcel
                    }
                );
            }
        },

        // appel ajax pour exporter un fichier xlsx
        exportExcel: function() {
            var g = this.grid,
                res = [];
            g.getStore().data.each(function(uneLigne){
                // TODO: you can prepare data here, before push
                res.push(uneLigne.json);
            });
            if (res.length > 0) {
                // TODO: you can do anything you want here, for exemple, export datas to server
                // YourProject.DownloadFile({
                //     url     : '/export/export-excel/',
                //     params  : {datas: Ext.encode(res)},
                //     prepare : true
                // });
            } else {
                Ext.Msg.info("Information", "You don't have anything to export");
            }
        }
    }
});
