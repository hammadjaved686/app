// src/app/services/logger.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(message: string): void {
    console.log(`[LoggerService] ${message}`);
  }

  error(message: string): void {
    console.error(`[LoggerService] ERROR: ${message}`);
  }
  
}
