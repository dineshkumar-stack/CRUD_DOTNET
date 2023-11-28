/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Comments } from '@ckeditor/ckeditor5-comments';
import { Plugin, type EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RevisionHistory } from '@ckeditor/ckeditor5-revision-history';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TrackChanges, TrackChangesData } from '@ckeditor/ckeditor5-track-changes';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
export declare class RevisionHistoryAdapter extends Plugin {
    static get requires(): Array<string>;
    init(): void;
}
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof RevisionHistoryAdapter | typeof TextTransformation | typeof Autoformat | typeof Bold | typeof Italic | typeof BlockQuote | typeof CloudServices | typeof CKBox | typeof Essentials | typeof Paragraph | typeof Heading | typeof Image | typeof ImageCaption | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof Link | typeof List | typeof MediaEmbed | typeof PasteFromOffice | typeof Table | typeof TableToolbar | typeof Comments | typeof PictureEditing | typeof RevisionHistory | typeof TrackChanges | typeof TrackChangesData)[];
    static defaultConfig: EditorConfig;
}
export default Editor;
