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
 * And, you need to decide whot to do with your grid datas
 */
Ext.ns('Ext.ux.grid');

Ext.ux.grid.GridHeaderMenuExport = Ext.extend(Ext.util.Observable, {

    /**
     * parameters to be defined
     */

    // text of button
    exportText: 'Print',
    // TODO: class css to be creat in project css, exemple :
    // .xg-hmenu-print{
    //     background-image: url(../javascript/extjs/resources/icons/fam/printer.png);
    //     background-repeat: no-repeat;
    //  }
    clsCss: 'xg-hmenu-print',
    // call ajax for export datas in a xlsx file
    exportExcel: function(datas) {
        // It's your time now :)
    },

    /**
     * plugin
     */

    constructor: function(config){
        this.config = config;
    },

    init: function(grid){
        Ext.apply(grid.getView(), this.viewConfig);
    },

    viewConfig: {

        // add a button "Print" in grid header menu
        afterRenderUI: function(){

            this.constructor.prototype.afterRenderUI.apply(this, arguments);
            if(this.grid.enableExport !== false){
                this.hmenu.add(
                    '-',
                    {
                        itemId  : 'export',
                        text    : Ext.ux.grid.GridHeaderMenuExport.prototype.exportText,
                        cls     : Ext.ux.grid.GridHeaderMenuExport.prototype.clsCss,
                        scope   : this,
                        handler : this.getDatas
                    }
                );
            }
        },

        // get grid datas
        // in this plugin, the handler export all datas to server
        // but you can creat your own handler to do any thing you want
        getDatas: function() {
            var g = this.grid,
                datas = [];
            g.getStore().data.each(function(uneLigne){
                // TODO: you can prepare data here, before push
                datas.push(uneLigne.json);
            });
            // TODO: you can do anything you want here, for exemple, export datas to server
            Ext.ux.grid.GridHeaderMenuExport.prototype.exportExcel(datas);
        }
    }
});
