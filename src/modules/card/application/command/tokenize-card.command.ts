export class TokenizeCardCommand {
  constructor(
    private readonly email: string,
    private readonly number: string,
    private readonly cvv: string,
    private readonly expirationMonth: string,
    private readonly expirationYear: string,
  ) {}

  public getEmail(): string {
    return this.email;
  }

  public getNumber(): string {
    return this.number;
  }

  public getCVV(): string {
    return this.cvv;
  }

  public getExpirationMonth(): string {
    return this.expirationMonth;
  }

  public getExpirationYear(): string {
    return this.expirationYear;
  }
}
