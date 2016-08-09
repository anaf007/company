/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,templates,panel,floatpanel,menu,contextmenu,div,resize,button,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,forms,listblock,richcombo,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc,pbckcode,lineutils,widget,codesnippet,imagebrowser,imgbrowse,filetools,notification,notificationaggregator,uploadwidget,uploadimage,imageuploader,image2,imageresize,sourcedialog,base64image,imagerotate,tableresize,imagepaste,autolink,pastefromexcel,imgupload,htmlbuttons,html5audio,bgimage,devtools,basewidget,layoutmanager,markdown';
	config.skin = 'moono';
	// %REMOVE_END%

	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// config.removeDialogTabs = 'image:advanced;link:advanced';
	// config.filebrowserImageUploadUrl= "/admin/upload"; 
	// filebrowserBrowseUrl = '/admin/fileupload';
};
