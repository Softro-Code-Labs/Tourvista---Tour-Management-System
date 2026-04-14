import { Module } from '@nestjs/common';
import { ClerkClientProvider } from './clerk.provider';

@Module({
  providers: [ClerkClientProvider],
  exports: [ClerkClientProvider],
})
export class ClerkModule {}
