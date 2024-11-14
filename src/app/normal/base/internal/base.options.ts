import {TimeFormatType} from "@app/normal/base/internal/base.enums.ts";

export const TimeFormatTypeOptions = [
    {label: 'yyyy', value: TimeFormatType.YYYY},
    {label: 'yyyyMM', value: TimeFormatType.YYYY_MM},
    {label: 'yyyyMMdd', value: TimeFormatType.YYYY_MM_DD},
    {label: 'yyyyMMddHH', value: TimeFormatType.YYYY_MM_DD_HH},
    {label: 'yyyyMMddHHmm', value: TimeFormatType.YYYY_MM_DD_HH_MM},
    {label: 'yyyyMMddHHmmss', value: TimeFormatType.YYYY_MM_DD_HH_MM_SS},
]