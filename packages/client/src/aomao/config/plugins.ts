import type { PluginEntry } from '@aomao/engine'
import Redo from '@aomao/plugin-redo'
import Undo from '@aomao/plugin-undo'
import Bold from '@aomao/plugin-bold'
import Code from '@aomao/plugin-code'
import Backcolor from '@aomao/plugin-backcolor'
import Fontcolor from '@aomao/plugin-fontcolor'
import Fontsize from '@aomao/plugin-fontsize'
import Italic from '@aomao/plugin-italic'
import Underline from '@aomao/plugin-underline'
import Hr from '@aomao/plugin-hr'
import Tasklist from '@aomao/plugin-tasklist'
import Orderedlist from '@aomao/plugin-orderedlist'
import Unorderedlist from '@aomao/plugin-unorderedlist'
import Indent from '@aomao/plugin-indent'
import Heading from '@aomao/plugin-heading'
import Strikethrough from '@aomao/plugin-strikethrough'
import Sub from '@aomao/plugin-sub'
import Sup from '@aomao/plugin-sup'
import Alignment from '@aomao/plugin-alignment'
import Mark from '@aomao/plugin-mark'
import Quote from '@aomao/plugin-quote'
import PaintFormat from '@aomao/plugin-paintformat'
import RemoveFormat from '@aomao/plugin-removeformat'
import SelectAll from '@aomao/plugin-selectall'
import Image from '@aomao/plugin-image'
import Table from '@aomao/plugin-table'
import Math from '@aomao/plugin-math'
import Fontfamily from '@aomao/plugin-fontfamily'
import Status from '@aomao/plugin-status'
import LineHeight from '@aomao/plugin-line-height'
import Mention from '@aomao/plugin-mention'
import Embed from '@aomao/plugin-embed'
import { ToolbarPlugin } from 'aomao/toolbar'

export const defaultPlugins: Array<PluginEntry> = [
    Redo,
    Undo,
    Bold,
    Code,
    Backcolor,
    Fontcolor,
    Fontsize,
    Italic,
    Underline,
    Hr,
    Tasklist,
    Orderedlist,
    Unorderedlist,
    Indent,
    Heading,
    Strikethrough,
    Sub,
    Sup,
    Alignment,
    Mark,
    Quote,
    PaintFormat,
    RemoveFormat,
    SelectAll,
    Image,
    Table,
    Math,
    Fontfamily,
    Status,
    LineHeight,
    Mention,
    Embed,
    ToolbarPlugin
]
