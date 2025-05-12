import { SetMetadata } from '@nestjs/common';
import { EMetadataKeys } from 'common/constants';

export const Public = () => SetMetadata(EMetadataKeys.IS_PUBLIC, true);
