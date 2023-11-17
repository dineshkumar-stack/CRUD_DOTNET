/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { Template } from '@ckeditor/ckeditor5-template';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Comments } from '@ckeditor/ckeditor5-comments';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm';
import { FullPage } from '@ckeditor/ckeditor5-html-support';

import {
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import {
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends DecoupledEditor {
	public static override builtinPlugins = [
		Bold,
		Markdown,
		FullPage,
		SourceEditing,
		Alignment,
		Template,
		Autoformat,
		BlockQuote,
		Bold,
		CKBox,
		CloudServices,
		Comments,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Heading,
		Image,
		ImageCaption,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		Link,
		List,
		ListProperties,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Strikethrough,
		Table,
		TableCellProperties,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'sourceEditing',
				'heading',
				'|',
				'ckbox',
				'comment',
				'commentsArchive',
				'|',
				'fontColor',
				'fontFamily',
				'fontSize',
				'fontBackgroundColor',
				'|',
				'alignment',
				'|',
				'numberedList',
				'bulletedList',
				'|',
				'outdent',
				'indent',
				'todoList',
				'|',
				'undo',
				'redo',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'link',
				'blockQuote',
				'insertTemplate',
				'|',
				'imageUpload',
				'insertTable',
				'mediaEmbed',
				'|'
			],
			shouldNotGroupWhenFull: true
		},
		language: 'en',
		image: {
			toolbar: [
				'comment',
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableCellProperties',
				'tableProperties'
			],
			tableToolbar: [
				'comment'
			]
		},
		comments: {
			editorConfig: {
				extraPlugins: [
					Autoformat,
					Bold,
					Italic,
					List
				]
			}
		},
	}
}

export default Editor;
