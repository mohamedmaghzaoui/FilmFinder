import dotenv from 'dotenv';

dotenv.config();

export class AppConfig {
  private static instance: AppConfig;

  public readonly port: number;
  public readonly dataSource: string;

  private constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.dataSource = process.env.DATA_SOURCE ?? 'mock';
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }

    return AppConfig.instance;
  }

  public isMock(): boolean {
    return this.dataSource === 'mock';
  }
}
