
import {
    TerminusEndpoint,
    TerminusOptionsFactory,
    DNSHealthIndicator,
    TypeOrmHealthIndicator,
    MemoryHealthIndicator,
    TerminusModuleOptions,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
    constructor(
        private readonly dns: DNSHealthIndicator,
        private readonly torm: TypeOrmHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
    ) { }

    createTerminusOptions(): TerminusModuleOptions {
        const healthEndpoint: TerminusEndpoint = {
            url: '/health',
            healthIndicators: [
                async () => this.dns.pingCheck('google', 'https://google.com'),
                //async () => this.torm.pingCheck('readingroom', {timeout: 1500}),
                async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
                async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
            ],
        };
        return {
            endpoints: [healthEndpoint],
        };
    }
}