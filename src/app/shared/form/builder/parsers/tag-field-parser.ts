import { FieldParser } from './field-parser';
import { FormFieldModel } from '../models/form-field.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { isNotEmpty } from '../../../empty.util';
import { DynamicTagModel, DynamicTagModelConfig } from '../ds-dynamic-form-ui/models/tag/dynamic-tag.model';

export class TagFieldParser extends FieldParser {

  constructor(protected configData: FormFieldModel, protected initFormValues,
              protected authorityUuid: string) {
    super(configData, initFormValues);
  }

  public modelFactory(fieldValue: FormFieldMetadataValueObject): any {
    const tagModelConfig: DynamicTagModelConfig = this.initModel();
    if (this.configData.selectableMetadata[0].authority
      && this.configData.selectableMetadata[0].authority.length > 0) {
      tagModelConfig.authorityClosed = this.configData.selectableMetadata[0].closed;
      tagModelConfig.authorityMetadata = this.configData.selectableMetadata[0].metadata;
      tagModelConfig.authorityName = this.configData.selectableMetadata[0].authority;
      tagModelConfig.authorityScope = this.authorityUuid;
    }

    tagModelConfig.minChars = 3;
    this.setValues(tagModelConfig, fieldValue, null, true);

    const tagModel = new DynamicTagModel(tagModelConfig);

    return tagModel;
  }

}
