export class GetCardQuery {
  constructor(private readonly token: string) {}

  public getToken(): string {
    return this.token;
  }
}
