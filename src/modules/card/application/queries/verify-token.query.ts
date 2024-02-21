export class VerifyTokenQuery {
  constructor(private readonly token: string) {}

  public getToken(): string {
    return this.token;
  }
}
