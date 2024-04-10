import type { CardEntry } from '@aomao/engine'
import { ImageComponent } from '@aomao/plugin-image'
import { TableComponent } from '@aomao/plugin-table'
import { VideoComponent } from '@aomao/plugin-video'
import { MathComponent } from '@aomao/plugin-math'
import { StatusComponent } from '@aomao/plugin-status'
import { MentionComponent } from '@aomao/plugin-mention'
import { EmbedComponent } from '@aomao/plugin-embed'
import { HrComponent } from '@aomao/plugin-hr'
import { CheckboxComponent } from '@aomao/plugin-tasklist'
import { ToolbarComponent } from 'aomao/toolbar'
import { FileComponent } from '@aomao/plugin-file'
import { CodeBlockComponent } from '@aomao/plugin-codeblock-vue'

export const defaultCards: Array<CardEntry> = [
    HrComponent,
    CheckboxComponent,
    ImageComponent,
    TableComponent,
    MathComponent,
    StatusComponent,
    MentionComponent,
    EmbedComponent,
    VideoComponent,
    ToolbarComponent,
    FileComponent,
    CodeBlockComponent
]
