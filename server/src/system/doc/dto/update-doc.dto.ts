import { PartialType, ApiProperty } from '@nestjs/swagger'
import { CreateDocDto } from './create-doc.dto'

export class UpdateDocDto extends PartialType(CreateDocDto) {}
